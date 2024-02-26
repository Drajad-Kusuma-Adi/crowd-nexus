import { useState, useEffect } from "react";
import { api } from "../../../guard/Api";

function WishlistCard({event_id}: {event_id: number}) {
    const [event, setEvent] = useState(null);

    useEffect(() => {
        api.get('/eventDetails', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                event_id: event_id
            }
        })
        .then((response) => {
            setEvent(response.data.event);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    if (event !== undefined && event !== null) {
        return (
            <div className="m-4 p-4 w-[75%] rounded-lg flex justify-between items-center bg-white shadow-md d-flex">
              <div className="flex justify-center items-center flex-wrap">
                  <img className="w-[100px] h-[100px] rounded-lg" src={"http://localhost:8000/storage/photos/" + event.image} alt={event.title} />
                  <div className="p-5">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{event.title.length > 20 ? `${event.title.slice(0, 20)}...` : event.title}</h5>
                  </div>
              </div>
              <a href={"/event-details?id=" + event_id} className="w-fit my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">View Details</a>
            </div>
          );
    }
}

export default WishlistCard;