function EventPopup({id, title, description, image}: {id: number, title: string, description: string, image: string}) {
    const shortDescription = description.slice(0, 100);

    return (
        <div className="my-4 flex flex-col justify-center items-center">
            <img className="w-[100px] h-[100px] rounded-lg" src={"http://localhost:8000/storage/photos/" + image} alt={title} />
            <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
            <p className="mb-3 text-sm font-normal text-justify">
                {description.length < 100 ? description : shortDescription}
                {description.length > 100 && (
                    <>
                        ...
                        <br /><br /><hr /><br />
                        <a style={{color: 'white'}} href={"/event-details?id=" + id} className='transition duration-300 font-ubuntu-condensed w-full bg-blue-600 text-center text-white hover:bg-blue-800 hover:text-white rounded-lg px-4 py-2'>View Details</a>
                    </>
                )}
                {description.length < 100 && (
                    <>
                        <br /><br /><hr /><br />
                        <a style={{color: 'white'}} href={"/event-details?id=" + id} className='transition duration-300 font-ubuntu-condensed w-full bg-blue-600 text-center text-white hover:bg-blue-800 hover:text-white rounded-lg px-4 py-2'>View Details</a>
                    </>
                )}
            </p>
            </div>
        </div>
    );
}

export default EventPopup;