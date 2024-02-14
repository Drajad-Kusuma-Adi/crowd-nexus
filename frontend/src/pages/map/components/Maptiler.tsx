import './Maptiler.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocated } from 'react-geolocated';
import { useEffect, useState } from 'react';
import { api } from '../../../guard/Api';

function Maptiler() {
  const [image, setImage] = useState('');
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
        alert('Something went wrong, please reload the page');
        console.log(error);
      })
    }
  })

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  if (!isGeolocationAvailable) {
    alert('Your browser does not support Geolocation');
  }

  if (!isGeolocationEnabled) {
    alert('Geolocation is not enabled');
  }

  const [collapsed, setCollapsed] = useState(true);

  function toggleMenu() {
    setCollapsed(!collapsed);
  }

  const [profileCollapsed, setProfileCollapsed] = useState(true);

  function toggleProfile() {
    setProfileCollapsed(!profileCollapsed);
  }

  // const defaultCoords: [number, number] = [51.5074, -0.1278];

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

  if (coords !== undefined) {
    return (
      <>
        <MapContainer center={coords ? [coords.latitude, coords.longitude] : [51.5074, -0.1278]} zoom={20} style={{ height: '100vh', width: '100wh', zIndex: 0, overflow: 'hidden' }} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      </MapContainer>

        <div className="fixed top-0 bg-white z-50 p-1 rounded-lg m-4">
          {
            image ? (
              <div className='flex'>
                <img src={image} alt="profile.png" className="rounded-lg" width="75px" />
                <svg
                  className='w-8 -rotate-90 hover:cursor-pointer'
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
                { !profileCollapsed ? <div className="flex flex-col bg-white rounded-full p-1">
                  <button className='text-black rounded-lg bg-white p-1'><a href="/profile" className='text-black rounded-lg bg-white p-1 '>Check profile</a></button>
                  <button onClick={signOut} className='text-black rounded-lg bg-white p-1 hover:text-blue-600'>Sign out</button>
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
            <form>
              <div className="search-bar mb-6 flex items-center border rounded-lg w-[80%] mx-auto">
                <input
                  type="text"
                  placeholder="Search for event..."
                  className="px-4 py-2 w-full outline-none bg-gray-100"
                />
                <button type='submit' className="px-4 py-2 bg-blue-600 ml-[-10px] rounded-r-lg">
                  <img src="search.svg" alt="search.svg" />
                </button>
              </div>
            </form>
  
            <div className="flex justify-center flex-wrap h-[80%]" style={{overflowY: 'scroll'}}>
              <div className="card bg-white border rounded-lg w-[40vw] me-4">
                <img src="/path/to/image" alt="" className="rounded-t-lg h-48 w-full object-cover" />
                <div className="card-content p-4">
                  <h3>Event 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
  
              <div className="card bg-white border rounded-lg w-[40vw] me-4">
                <img src="/path/to/image" alt="" className="rounded-t-lg h-48 w-full object-cover" />
                <div className="card-content p-4">
                  <h3>Event 2 With Longer...</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorem,
                    vitae minima est officia tenetur aliquam laboriosam...
                  </p>
                </div>
              </div>
  
              <div className="card bg-white border rounded-lg w-[40vw] me-4">
                <img src="/path/to/image" alt="" className="rounded-t-lg h-48 w-full object-cover" />
                <div className="card-content p-4">
                  <h3>Event 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
  
              <div className="card bg-white border rounded-lg w-[40vw] me-4">
                <img src="/path/to/image" alt="" className="rounded-t-lg h-48 w-full object-cover" />
                <div className="card-content p-4">
                  <h3>Event 2 With Longer...</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorem,
                    vitae minima est officia tenetur aliquam laboriosam...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
    )
  }
}

export default Maptiler;