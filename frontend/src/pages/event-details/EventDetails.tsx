import { useEffect, useState } from "react";
import { api } from "../../guard/Api";
import React from "react";
import { Dialog } from "@material-tailwind/react";
import TicketCard from "./components/TicketCard";
import Loading from "../../components/Loading";
import Comments from "./components/Comments";

function EventDetails() {
    const searchParams = new URLSearchParams(window.location.search);
    const event_id = searchParams.get("id");
    const [creator, setCreator] = useState(null);
    const [event, setEvent] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [isWishlist, setIsWishlist] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        api.get('/eventDetails', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                event_id: event_id
            }
        })
        .then((response) => {
            setEvent(response.data.event);
            api.get('/getEventCreator', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                params: {
                    user_id: response.data.event.users_id
                }
            })
            .then((response) => {
                setCreator(response.data.user);
                api.get('/checkToken', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                  .then((response) => {
                    api.get('/checkIsWishlist', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                        params: {
                            user_id: response.data.user.id,
                            event_id: event_id
                        }
                    })
                    .then((response) => {
                        if (response.data.success === true) {
                            setIsWishlist(true);
                        } else {
                            setIsWishlist(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                  })
                  .catch((error) => {
                    console.log(error);
                  })
            })
            .catch((error) => {
                console.log(error);
            })
            api.get('/getEventTickets', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    event_id: event_id
                }
            })
            .then((response) => {
                setTickets(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function wishlistEvent() {
        api.get('/checkToken', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            api.post('/wishlistEvent', {
                user_id: response.data.user.id,
                event_id: event_id
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                setIsWishlist(true);
            })
            .catch((error) => {
                console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    function unwishlistEvent() {
        api.get('/checkToken', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            api.delete('/unwishlistEvent', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                data: {
                    user_id: response.data.user.id,
                    event_id: event_id
                }
            })
            .then(() => {
                setIsWishlist(false);
            })
            .catch((error) => {
                console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    function reportEvent() {
        api.get('/checkToken', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            api.post('/reportEvent', {
                user_id: response.data.user.id,
                event_id: event_id,
                description: "Please take a look at this event and take actions accordingly."
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Event reported successfully! Our admins will take action as soon as possible.');
                window.location.pathname = '/map';
            })
            .catch((error) => {
                console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    if (event !== null && creator !== null && event !== undefined && creator !== undefined) {
        return (
            <>
                <Dialog size="sm" open={open} handler={handleOpen} placeholder={undefined}>
                    <img
                        alt="event image"
                        className="h-[80vh] w-[80vw] rounded-lg object-cover object-center"
                        src={"http://localhost:8000/storage/photos/" + event.image}
                    />
                </Dialog>
                <img src={"http://localhost:8000/storage/photos/" + event.image} alt="event image" className="w-[100vw] h-[40vh] object-cover hover:opacity-75 hover:cursor-pointer transition duration-300" onClick={handleOpen} />
                <div className="container mx-auto">
                <div className="flex justify-center md:justify-between items-center flex-wrap px-8 my-8">
                    <p className="text-6xl font-bold font-ubuntu text-center m-4">{event.title}</p>
                    <a href="/map" className="font-ubuntu-condensed border rounded-lg p-4 my-4 border-blue-600 hover:cursor-pointer hover:bg-blue-800 hover:text-white transition duration-300">Back to Map</a>
                </div>
                <hr />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                    <div className="flex justify-between items-center md:flex-wrap lg:flex-nowrap h-[100%] bg-gray-100 p-4 border border-black rounded-lg">
                        <img src="eventDate.svg" alt="calendar" className="object-contain w-[50px] md:w-[150px]" />
                        <div className="flex flex-col justify-evenly w-full ms-8">
                            <p className="text-3xl font-bold font-ubuntu-condensed">Date</p>
                            <p className="text-base opacity-50 font-ubuntu-condensed">{event.date}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center md:flex-wrap lg:flex-nowrap h-[100%] bg-gray-100 p-4 border border-black rounded-lg">
                        <img src="eventTime.svg" alt="clock" className="object-contain w-[50px] md:w-[150px]" />
                        <div className="flex flex-col justify-evenly w-full ms-8">
                            <p className="text-3xl font-bold font-ubuntu-condensed">Time</p>
                            <p className="text-base opacity-50 font-ubuntu-condensed">{event.time}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center md:flex-wrap lg:flex-nowrap h-[100%] bg-gray-100 p-4 border border-black rounded-lg">
                        <img src="eventLocation.svg" alt="map" className="object-contain w-[50px] md:w-[150px]" />
                        <div className="flex flex-col justify-evenly w-full ms-8">
                            <p className="text-3xl font-bold font-ubuntu-condensed">Location</p>
                            <p className="text-base opacity-50 font-ubuntu-condensed">{event.location}</p>
                        </div>
                    </div>
                </div>
                <br /><br />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
                    <div className="col-span-2 flex flex-col justify-between h-full bg-white p-4 border border-black rounded-lg">
                        <div>
                            <span className="flex items-center"><img src="description.svg" alt="description.svg" className="object-contain w-8 me-2" /><span className="font-bold font-ubuntu-condensed">Description:</span></span>
                            <br />
                            <p className="font-ubuntu-condensed opacity-50 text-justify">{event.description}</p>
                        </div>
                        <br />
                        <div className="flex flex-col justify-center items-start">
                            <span className="flex items-center">
                                <img src={`http://localhost:8000/storage/photos/${creator.image ? creator.image : "userPlaceholder.svg"}`} alt="creator image" className="object-contain rounded-full w-[50px] h-[50px] me-2" />
                                <span className="font-bold font-ubuntu-condensed">- Organized by <span className="text-blue-600">{creator.name}</span></span>
                            </span>
                            <br />
                            <span className="flex justify-center items-center">
                                {isWishlist === false ? (
                                    <button onClick={wishlistEvent} className='flex justify-center items-center transition duration-300 font-ubuntu-condensed me-2 w-full bg-blue-600 text-center text-white hover:bg-blue-800 hover:text-white rounded-lg px-4 py-2'><img src="wishlist.svg" alt="wishlist.svg" className="object-contain w-4 me-2" />Wishlist</button>
                                ) : (
                                    <button onClick={unwishlistEvent} className='flex justify-center items-center transition duration-300 font-ubuntu-condensed me-2 w-full bg-blue-600 text-center text-white hover:bg-blue-800 hover:text-white rounded-lg px-4 py-2'><img src="wishlist.svg" alt="wishlist.svg" className="object-contain w-4 me-2" />Unwishlist</button>
                                )}
                                <button onClick={reportEvent} className='flex justify-center items-center transition duration-300 font-ubuntu-condensed me-2 w-full bg-red-600 text-center text-white hover:bg-red-800 hover:text-white rounded-lg px-4 py-2'><img src="report.svg" alt="report.svg" className="object-contain w-4 me-2" />Report</button>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 h-full flex flex-col justify-center items-center bg-white p-4 border border-black rounded-lg">
                        <p className="font-ubuntu-condensed text-3xl font-bold">Tickets</p>
                        {tickets.map((ticket, index) => (
                            <TicketCard key={index} id={ticket.id} name={ticket.name} benefits={ticket.benefits} price={ticket.price} />
                        ))}
                    </div>
                </div>
                <br /><br />
                <Comments />
                <br /><br />
            </div>
            </>
        )
    } else {
        <Loading />
    }
}

export default EventDetails;