import '../map/components/Maptiler.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { LatLng } from 'leaflet';
import { useGeolocated } from 'react-geolocated';
// import { api } from "../../guard/Api";
import { useState } from 'react';
import { api } from '../../guard/Api';

function EventCreator() {
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [location, setLocation] = useState<LatLng | null>(null);

      function LocationMarker() {
        const [position, setPosition] = useState<LatLng | null>(null);
        const map = useMapEvents({
          click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            setLocation(position);
          },
        })

        return position === null ? null : (
            <>
                <Marker position={position}>
                    <Popup>Your event will be located here</Popup>
                </Marker>
            </>
        )
      }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [tickets, setTickets] = useState<{ name: string, benefits: string, price: string }[]>([]);

        function addTicket(event: React.FormEvent<HTMLFormElement>) {
            event.preventDefault();
            if (tickets.length < 5) {
                const formData = new FormData(event.currentTarget);
                const price = formData.get('ticketPrice');
                const formattedPrice = Number(price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
                const stringPrice = formattedPrice.toString();
                setTickets([...tickets, {
                    name: formData.get('ticketName') as string || '',
                    benefits: formData.get('ticketBenefits') as string || '',
                    price: stringPrice
                }]);
            } else {
                alert('Cannot create more than 5 tickets per event');
            }
        }

      function submitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData(event.currentTarget);

        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

        api.get('/checkToken', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            formData.append('users_id', response.data.user.id);
            api.post('/createEvent', formData, config)
            .then(() => {
                window.location.pathname = '/profile'
                // TODO: Send tickets array to createTickets API
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
      }

      return (
        coords && (
            <div className="container w-[80vw] font-ubuntu-condensed">
                <br /><br />
                <p className="text-center font-bold text-4xl font-ubuntu my-4">Event Creator</p>
                <br />
                <form className='p-4 border border-2 rounded-lg' onSubmit={addTicket}>
                    <div className="flex flex-col lg:flex-row justify-around items-center">
                        <div className="flex flex-col items-start">
                            <label htmlFor="ticketName">Ticket Name</label>
                            <br />
                            <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="text" name="ticketName" id="ticketName" placeholder="Enter ticket name..." />
                            <br /><br />
                            <label htmlFor="ticketBenefits">Ticket Benefits</label>
                            <br />
                            <textarea required className='w-full bg-white p-2 border border-2 rounded-lg' name="ticketBenefits" id="ticketBenefits" placeholder="Explain what will people get in this ticket..."></textarea>
                            <br /><br />
                            <label htmlFor="ticketPrice">Ticket Price</label>
                            <br />
                            <div className="flex items-center">Rp <input required type="number" className='ms-2 w-full bg-white p-2 border border-2 rounded-lg' name="ticketPrice" id="ticketPrice" placeholder='Enter ticket price...' /></div>
                            <br /><br />
                            <input className="w-fit my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2" type="submit" value="Add Ticket" />
                        </div>
                        <div className="flex flex-col items-center border border-2 rounded-lg p-2 w-[80vw] my-4 lg:w-[20vw] h-[50vh] overflow-y-scroll">
                            <p className="text-center font-bold text-2xl font-ubuntu my-4">Ticket List</p>
                            {tickets.length > 0 ? tickets.map((ticket, index) => (
                                <div className="my-2 flex flex-col items-center rounded-lg border border-2 py-4 px-8">
                                    <p className='text-4xl font-bold'>{ticket.name}</p>
                                    <p className='opacity-50'>{ticket.price}</p>
                                    <div className="flex">
                                        <button onClick={() => setTickets(tickets.filter((_, i) => i !== index))} className="w-full mx-2 my-1 text-white rounded-lg bg-red-600 hover:bg-red-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center cursor-pointer px-4 py-2">Delete</button>
                                    </div>
                                </div>
                            )) : <>No ticket yet, create one!</>}
                        </div>
                    </div>
                </form>
                <br />
                <form className='p-4 border border-2 rounded-lg text-center' onSubmit={submitEvent} encType="multipart/form-data">
                    <div className='text-start'>
                        <label className='ms-2' htmlFor="title">Event Title</label>
                    <br />
                    <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="text" name="title" id="title" placeholder="Enter event name..." /></div>
                    <br /><br />
                    <div className='text-start'>
                        <label className='ms-2' htmlFor="description">Event Description</label>
                    <br />
                    <textarea className='w-full bg-white p-2 border border-2 rounded-lg' name="description" id="description" placeholder="Write an elaborate description on what will happen on your event..."></textarea></div>
                    <br /><br />
                    <div className="flex justify-between flex-wrap">
                        <div className="">
                            <div>
                                <label htmlFor="date">Date</label>
                            <br />
                            <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="date" name="date" id="date" /></div>
                        </div>
                        <div className="">
                            <div>
                                <label htmlFor="startTime">Start Time</label>
                            <br />
                            <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="text" name="time" id="time" placeholder='hh:mm' /></div>
                        </div>
                    </div>
                    <br /><br />
                    <div className='text-start'>
                        <label className='ms-2' htmlFor="image">Event Image</label>
                    <br />
                    <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="file" name="image" id="image" accept="image/*" /></div>
                    <br /><br />
                    <div className='text-start'>
                        <label className='ms-2' htmlFor="location">Event Location</label>
                        <input required className='w-full bg-white p-2 border border-2 rounded-lg' type="text" name="location" id="location" placeholder="Enter event location..." />
                        </div>
                    <br />
                    <p className="opacity-50 text-center">
                        Click on the map to determine where your event location should be visible to others
                    </p>
                    <div className="flex justify-center">
                        <MapContainer
                            center={[coords.latitude, coords.longitude]}
                            zoom={20}
                            style={{ height: '50vh', width: '75vw', zIndex: 0, overflow: 'hidden' }}
                            scrollWheelZoom={true}
                            zoomControl={false}
                        >
                            <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                    <input
                        required
                        type="number"
                        name="latitude"
                        id="latitude"
                        value={location?.lat}
                        readOnly
                        hidden
                    />
                    <input
                        required
                        type="number"
                        name="longitude"
                        id="longitude"
                        value={location?.lng}
                        readOnly
                        hidden
                    />
                    <br />
                    <div className="flex justify-center">
                        <input className="mx-2 w-fit my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2" type="submit" value="Create Event" />
                        <a className="mx-2 w-fit my-1 text-black rounded-lg bg-white border border-black hover:bg-blue-600 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2" href="/profile">Cancel</a>
                    </div>
                </form>
                <br />
                <br /><br />
            </div>
        )
    );
}

export default EventCreator;
