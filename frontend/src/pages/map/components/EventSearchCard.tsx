import { useState, useEffect } from 'react';

function EventSearchCard({id, image, title, description}: {id: number, image: string, title: string, description: string}) {
    const [shortenedTitle, setShortenedTitle] = useState(title.slice(0, 20));
    const [shortenedDescription, setShortenedDescription] = useState(description.slice(0, 100));

    useEffect(() => {
        setShortenedTitle(title.slice(0, 20));
        setShortenedDescription(description.slice(0, 100));
    }, [title, description]);

    return (
        <div className="bg-white border rounded-lg w-[40vw] m-4">
            <img src={`http://localhost:8000/storage/photos/${image}`} alt="event image" className="rounded-t-lg h-48 w-full object-cover" />
            <div className="p-4">
                <p className='font-ubuntu-condensed text-2xl font-bold'>{title.length > 20 ? shortenedTitle + "..." : title}</p>
                <p className='font-ubuntu-condensed opacity-50'>{description.length > 100 ? shortenedDescription + "..." : description}</p>
                <br /><hr /><br />
                <a href={`/event-details?id=${id}`} className="px-4 py-2 mx-auto rounded-lg font-ubuntu-condensed bg-blue-600 hover:bg-blue-800 text-white hover:text-white">View Details</a>
            </div>
        </div>
    );
}

export default EventSearchCard;