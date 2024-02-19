function EventCard({id, title, description, image}: {id: number, title: string, description: string, image: string}) {
    return (
        <div className="flex justify-between p-2">
            <div className="flex justify-center">
                <img src={"http://localhost:8000/storage/photos/" + image} alt="event photo" className="w-8 rounded-lg" />
                <div className="flex flex-col justify-start items-start">
                    <p className="text-3xl font-bold font-ubuntu">{title}</p>
                    <p className="opacity-50 font-ubuntu-condensed">{description}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <button className="w-full my-1 text-white rounded-lg bg-red-600 hover:bg-red-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default EventCard;