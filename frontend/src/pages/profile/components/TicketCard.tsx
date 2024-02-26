import { useEffect, useState } from "react";
import { api } from "../../../guard/Api";

function EventCard({ticket_id}: {ticket_id: number}) {
    const [event, setEvent] = useState(null);
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        api.get('/getTicketEvents', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                ticket_id: ticket_id
            }
        })
        .then((response) => {
            api.get('/eventDetails', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    event_id: response.data.event.id
                }
            })
            .then((response) => {
                setEvent(response.data.event);
            })
            .catch((error) => {
                console.log(error);
            })
            api.get('/ticketDetails', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    ticket_id: ticket_id
                }
            })
            .then((response) => {
                setTicket(response.data.ticket);
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    
    if (event !== undefined && event !== null && ticket !== undefined && ticket !== null) {
        return (
          new Date(event.date) > new Date() ? (
            <div className="m-4 p-4 w-[50%] bg-white shadow-md rounded-lg flex flex-col justify-between items-start d-flex">
              <div className="flex justify-center items-center flex-wrap">
                <img className="w-[100px] h-[100px] rounded-lg" src={`http://localhost:8000/storage/photos/${event.image}`} alt={event.title} />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{event.title.length > 20 ? `${event.title.slice(0, 20)}...` : event.title}</h5>
                </div>
              </div>
              <br />
              <p className="font-ubuntu-condensed text-center text-blue-600 text-2xl">{ticket.name} - {ticket.price}</p>
            </div>
          ) : null
        );
      }
}

export default EventCard;