import Card from "../../../components/Card";

function About() {
    return (
        <>
            <section id="about">
                <div>
                    <p className="text-4xl font-ubuntu">What is this all <span className="text-blue-600">About?</span></p>
                    <div className="flex flex-col items-center justify-center m-8">
                        <img src="about.svg" alt="about.svg" className="object-contain mx-8 w-[100%] md:w-[50%]" />
                        <p style={{textAlign: "justify"}} className="mt-5 text-xl opacity-50 font-ubuntu-condensed"><span className="text-blue-600">Crowd Nexus</span> is an event management platform designed to simplify the creation, management, and ticketing of events. We enable individuals and organizations to host successful events of all sizes and types, powered by our map-based technology.</p>
                    </div>
                    <p className="mt-5 text-xl opacity-50 font-ubuntu-condensed"></p>
                </div>
                <div>
                    {/* <p className="text-3xl font-ubuntu">Key Features</p> */}
                    <div className="flex justify-center flex-wrap">
                        <Card
                            image="mapBenefit.svg"
                            title="Map-Based Service"
                            description="We utilizes geolocation technology to index the nearest events from your customers’ location, helping you to effectively market your event with the neighbourhood and local environment more conveniently!"
                        />
                        <Card
                            image="ticketBenefit.svg"
                            title="Ticket Selling Platform"
                            description="We provide a platform to help marketing your events and tickets. No longer should you struggle with juggling multiple tools and platforms!"
                        />
                        <Card
                            image="createBenefit.svg"
                            title="Event Creation Tool"
                            description="We provide a tool to create your event, from title, description, image, and even ticket creation. Our tool is simple, intuitive, and gets you up and running in minutes. Say goodbye to long nights spent wrestling with design software and complicated ticketing systems!"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;