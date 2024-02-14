import './Maptiler.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocated } from 'react-geolocated';
import { useState } from 'react';

function Maptiler() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
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

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const defaultCoords: [number, number] = [51.5074, -0.1278];

  return (
    <>
      <MapContainer center={coords ? [coords.latitude, coords.longitude] : defaultCoords} zoom={10} style={{ height: '100vh', width: '100wh', zIndex: 0, overflow: 'hidden' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coords ? (
          <Marker position={[coords.latitude, coords.longitude]}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
        ) : (
          <></>
        )}
    </MapContainer>
    <div className="fixed bottom-0 w-full bg-transparent z-50">
      <img src="menu.svg" alt="menu.svg" className="rounded-lg mx-auto w-10 h-10 hover:cursor-pointer m-4" onClick={toggleMenu} />
      {!collapsed && (
        <div className="w-full p-4 bg-white h-[50vh]">
          <form>
            <div className="search-bar mb-6 flex items-center border rounded-lg">
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
  );
}

export default Maptiler;