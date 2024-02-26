import { useState } from "react";
import { api } from "../../../guard/Api";

function EventCard({id, title, description, image}: {id: number, title: string, description: string, image: string}) {
    const [expanded, setExpanded] = useState(false);
    const shortDescription = description.slice(0, 100);
    const handleClick = () => {
      setExpanded(!expanded);
    }

    function deleteEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const event_id = parseInt(formData.get('event_id') as string);
        const token = localStorage.getItem('token');

        api.delete('deleteEvent', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                event_id: event_id
            }
        })
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.log(error);
            console.log(event_id);
        })
    }

    return (
      <div className="m-4 p-4 w-[75%] rounded-lg flex justify-between items-center bg-white shadow-md d-flex">
        <div className="flex justify-center items-center">
            <img className="w-[100px] h-[100px] rounded-lg" src={"http://localhost:8000/storage/photos/" + image} alt={title} />
            <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="mb-3 text-sm font-normal text-justify">
                {expanded ? description : shortDescription}
                {description.length > 100 && !expanded && (
                <span>...<button className="bg-transparent ml-1 font-bold" onClick={handleClick}>Read more</button></span>
                )}
                {expanded && (
                <button className="bg-transparent ml-1 font-bold" onClick={handleClick}>Read less</button>
                )}
            </p>
            </div>
        </div>
        <div className="flex flex-col">
            <button type="submit" className="w-full my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">Edit</button>
            <form className="my-4" onSubmit={deleteEvent}>
                <input type="hidden" name="event_id" value={id} />
                <button type="submit" className="w-full my-1 text-white rounded-lg bg-red-600 hover:bg-red-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">Delete</button>
            </form>
        </div>
      </div>
    );
}

export default EventCard;