import { useEffect, useState } from "react";
import { api } from "../../guard/Api";
import EventCard from "./components/EventCard";
import TicketCard from "./components/TicketCard";
import WishlistCard from "./components/WishlistCard";

function Profile() {
    const [id, setId] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [userEvents, setUserEvents] = useState([]);
    const [userTickets, setUserTickets] = useState([]);
    const [userWishlists, setUserWishlists] = useState([]);

    const [show, setShow] = useState(1);

    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        api.get('/checkToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setId(response.data.user.id);
            setEmail(response.data.user.email);
            setName(response.data.user.name);
            setImage(response.data.user.image);

            api.get('/userEvents', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                const upcomingEvents = response.data.events.filter(event => new Date(event.date) > new Date());
                setUserEvents(upcomingEvents.slice(0, 10));
            })
            .catch((error) => {
                console.log(error);
            })
    
            api.get('/userTickets', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    user_id: response.data.user.id
                }
            })
            .then((response) => {
                setUserTickets(response.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            })
    
            api.get('/getUserWishlists', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    user_id: response.data.user.id
                }
            })
            .then((response) => {
                setUserWishlists(response.data.wishlists);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            alert('Something went wrong, please refresh the page');
            console.log(error);
        })
    }, []);
    
    function showEvents() {
        setShow(1);
    }

    function showTickets() {
        setShow(2);
    }

    function showWishlists() {
        setShow(3)
    }

    function uploadPhoto(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();

        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        api
          .post("/photo", formData, config)
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
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

      if (id !== undefined &&
        email !== undefined &&
        name !== undefined &&
        image !== undefined &&
        userEvents !== undefined &&
        userTickets !== undefined &&
        userWishlists !== undefined) {
            return (
                <div className="container w-[80vw] lg:w-[50vw]">
                    <br /><br />
                    <div className="flex justify-between">
                        <p className="font-ubuntu text-black text-4xl">Profile</p>
                        <a href="/map"><img src="backArrow.svg" alt="backArrow.svg" className="w-8" /></a>
                    </div>
                    <br /><br />
                    <div className="flex justify-center md:justify-between flex-wrap">
                        <div className="flex my-4">
                            <form encType="multipart/form-data" className="me-4">
                                <label htmlFor="image" className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        className="absolute w-0 h-0 opacity-0"
                                        onChange={uploadPhoto}
                                    />
                                    <img
                                        src={image ? `http://localhost:8000/storage/photos/${image}` : 'userPlaceholder.svg'}
                                        alt="userProfile"
                                        className="w-[125px] h-[125px] rounded-lg me-8 hover:opacity-50 transition duration-300 cursor-pointer"
                                    />
                                </label>
                            </form>
                            <div className="flex flex-col justify-center">
                                <p className="text-3xl font-bold font-ubuntu">{name}</p>
                                <p className="text-xl opacity-50 font-ubuntu-condensed">{email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center my-4">
                            <a href="/event-creator" className="hidden lg:block w-full my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">
                                + New Event
                            </a>
                            <span onClick={signOut} className="hidden lg:block w-full my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">
                                Sign Out
                            </span>
                        </div>
                    </div>
                    <br /><br />
                    <hr />
                    <br />
                    <div className="flex justify-center">
                        <p onClick={showEvents} className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Events you've hosted so far">Events</p>
                        <p onClick={showTickets} className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Tickets for events you've bought">Tickets</p>
                        <p onClick={showWishlists} className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Events you might want to go to">Wishlists</p>
                    </div>
                    <br />
                    <hr />
                    <div className="flex flex-col justify-center items-center my-10">
                        {processing && <div>Processing...</div> }
                        {show === 1 && <div className="justify-center font-ubuntu text-4xl font-bold">Latest Events You've Created<br /><br /></div>}
                        {show === 1 && userEvents.length > 0 ? (
                            userEvents.map((event, index) => (
                                <EventCard key={index} id={event.id} title={event.title} description={event.description} image={event.image} />
                            ))
                        ) : null}
                        {show === 2 && <div className="justify-center font-ubuntu text-4xl font-bold">Latest Tickets You've Purchased<br /><br /></div>}
                        {show === 2 && userTickets.length > 0 ? (
                            userTickets.map((ticket, index) => (
                                <TicketCard key={index} ticket_id={ticket.tickets_id} />
                            ))
                        ) : null}
                        {show === 3 && <div className="justify-center font-ubuntu text-4xl font-bold">Your Wishlists<br /><br /></div>}
                        {show === 3 && userWishlists.length > 0 ? (
                            userWishlists.map((wishlist, index) => (
                                <WishlistCard key={index} event_id={wishlist.events_id} />
                            ))
                        ): null}
                    </div>
                    {/* <div className="flex justify-center my-10">
                        <img src="profileFooter.svg" alt="profileFooter.svg" />
                    </div> */}
                </div>
            )
    }
}

export default Profile;