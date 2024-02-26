import './Maptiler.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocated } from 'react-geolocated';
import { useEffect, useState } from 'react';
import { api } from '../../../guard/Api';
import EventPopup from './EventPopup';
import EventSearchCard from './EventSearchCard';
import Loading from '../../../components/Loading';

function Maptiler() {
  const [image, setImage] = useState('');
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      api.get('/checkToken', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        if (response.data.user.image !== null) {
          setImage(response.data.user.image);
        } else {
          setImage('userPlaceholder.svg');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

    api.get('/allEvents', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setEvents(response.data.events);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  if (!isGeolocationAvailable) {
    console.log('Your browser does not support Geolocation');
    return null;
  }

  if (!isGeolocationEnabled) {
    console.log('Geolocation is not enabled');
    return null;
  }

  const [collapsed, setCollapsed] = useState(true);

  function toggleMenu() {
    setCollapsed(!collapsed);
  }

  const [profileCollapsed, setProfileCollapsed] = useState(true);

  function toggleProfile() {
    setProfileCollapsed(!profileCollapsed);
  }

  function signOut() {
    api.get('/signout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => {
      window.location.pathname = '/';
    })
    .catch((error) => {
      alert('Something went wrong, please try again');
      console.log(error);
    })
  }

  function searchEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    api.get('/searchEvent', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: {
        keyword: formData.get('keyword')
      }
    })
    .then((response) => {
      setSearchEvents(response.data.events);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  if (coords !== undefined) {
    return (
      <>
        <MapContainer center={coords ? [coords.latitude, coords.longitude] : [51.5074, -0.1278]} zoom={20} style={{ height: '100vh', width: '100wh', zIndex: 0, overflow: 'hidden' }} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map((event, index) => {
              const eventDate = new Date(event.date);
              const currentDate = new Date();

              if (eventDate >= currentDate) {
                return (
                  <Marker key={index} position={[event.latitude, event.longitude]}>
                    <Popup>
                      <div className="flex justify-center">
                        <EventPopup
                          id={event.id}
                          title={event.title}
                          description={event.description}
                          image={event.image}
                        />
                      </div>
                    </Popup>
                  </Marker>
                );
              } else {
                return null;
              }
            })}
        </MapContainer>

        <div className="fixed top-0 bg-white z-50 rounded-lg m-4">
          {
            image ? (
              <div className='flex flex-col'>
                <div className="flex justify-center p-1">
                  <img src={image ? `http://localhost:8000/storage/photos/${image}` : 'userPlaceholder.svg'} alt="profile picture" className="rounded-lg m-2 w-[75px] h-[75px]" width="75px" />
                  <svg
                    className='w-8 hover:cursor-pointer'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={toggleProfile}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                { !profileCollapsed ? <div className="flex flex-col bg-white rounded-full p-1">
                  <button className='w-full text-start text-black rounded-lg bg-white p-1'><a href="/profile" className='text-black rounded-lg bg-white p-1'>Your Profile</a></button>
                  <button className='w-full text-start text-black rounded-lg bg-white p-1'><a href="/event-creator" className='text-black rounded-lg bg-white p-1'>Event Creator</a></button>
                  <button onClick={signOut} className='w-full text-start text-black rounded-lg bg-white p-1 hover:text-blue-600'><span className="text-black rounded-lg bg-white p-1">Sign out</span></button>
                </div> : null }
              </div>
            ) : (
              <a className="ps-5 pe-5 text-white bg-blue-600 hover:bg-blue-700 hover:text-white transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 font-ubuntu-condensed text-center" href="/sign-in">Sign In</a>
            )
          }
        </div>

      <div className="fixed bottom-0 w-full bg-transparent z-50">
        <img src="menu.svg" alt="menu.svg" className="rounded-lg mx-auto w-10 h-10 hover:cursor-pointer m-4" onClick={toggleMenu} />
        {!collapsed && (
          <div className={`transform transition-transform duration-500 ease-in-out ${collapsed ? 'scale-y-0' : 'scale-y-100'} w-full p-4 bg-white h-[50vh]`}>
            <form onSubmit={searchEvent}>
              <div className="search-bar mb-6 flex items-center border rounded-lg w-[80%] mx-auto">
                <input
                  type="text"
                  placeholder="Search for event..."
                  className="px-4 py-2 w-full outline-none bg-gray-100"
                  name='keyword'
                />
                <button type='submit' className="px-4 py-2 bg-blue-600 ml-[-10px] rounded-r-lg">
                  <img src="search.svg" alt="search.svg" />
                </button>
              </div>
            </form>
            <div className="flex justify-center flex-wrap" style={{overflowY: 'scroll', height: '40vh'}}>
            {searchEvents ? searchEvents.map((event, index) => {
              const eventDate = new Date(event.date);
              const currentDate = new Date();

              if (eventDate >= currentDate) {
                return (
                  <EventSearchCard
                    key={index}
                    id={event.id}
                    image={event.image}
                    title={event.title}
                    description={event.description}
                  />
                );
              } else {
                return null;
              }
            }) : null}
            </div>
          </div>
        )}
      </div>
      </>
    )
  } else {
    <Loading />
  }
}

export default Maptiler;