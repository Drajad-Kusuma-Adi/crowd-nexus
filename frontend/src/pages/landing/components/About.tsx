function About() {
    return (
        <>
            <section id="about">
                <div>
                    <p className="text-4xl font-ubuntu">What is this all <span className="text-blue-600">About?</span></p>
                    <p className="mt-5 text-xl opacity-50 font-ubuntu-condensed"><span className="text-blue-600">Crowd Nexus</span> is an event organizing tool. We offer basic features such as event creation and ticket offering. What makes us different than other similar services is our emphasis on <span className="text-blue-600">geolocation</span> technology. So this isn’t just another event organizing tool, but a media to keep you connected with the outside world and your society. No longer should virtual technology keep you confined indoor, get out there and explore!</p>
                </div>
                <br /><hr /><br />
                <div>
                    <p className="text-4xl font-ubuntu">What will you get?</p>
                    <div className="flex justify-center flex-wrap">
                    <div className="m-4 w-full lg:w-[40%] rounded-lg flex justify-center flex-wrap bg-white shadow-md d-flex">
                        <img className="w-[200px] object-cover pt-5" src="mapBenefit.svg" alt="map-based service" />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Map-Based Service</h5>
                            <p className="mb-3 text-sm font-normal text-justify">We utilizes geolocation technology to index the nearest events from your location, helping you to socialize with your neighborhood and local environment more conveniently!</p>
                        </div>
                    </div>
                    <div className="m-4 w-full lg:w-[40%] rounded-lg flex justify-center flex-wrap bg-white shadow-md d-flex">
                        <img className="w-[200px] object-cover pt-5" src="ticketBenefit.svg" alt="map-based service" />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Ticket Selling Platform</h5>
                            <p className="mb-3 text-sm font-normal text-justify">We provide a platform to help marketing your events and tickets. No longer should you struggle with juggling multiple tools and platforms!</p>
                        </div>
                    </div>
                    <div className="m-4 w-full lg:w-[40%] rounded-lg flex justify-center flex-wrap bg-white shadow-md d-flex">
                        <img className="w-[200px] object-cover pt-5" src="createBenefit.svg" alt="map-based service" />
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Event Creation Tool</h5>
                            <p className="mb-3 text-sm font-normal text-justify">We provide a tool to create your event, from title, description, image, and even ticket creation. Our tool is simple, intuitive, and gets you up and running in minutes. Say goodbye to long nights spent wrestling with design software and complicated ticketing systems!</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;