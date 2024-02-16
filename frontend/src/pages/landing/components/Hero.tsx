function Hero() {
    return (
        <>
            <section id="home">
                <p className="text-4xl font-ubuntu"><span className="text-blue-600">Crowd Nexus</span>: Your all-in-one tool for stress-free event planning</p>
                <p className="text-justify md:text-center mt-5 text-xl opacity-50 font-ubuntu-condensed">Planning an event doesn't have to be overwhelming. <span className="text-blue-600">Crowd Nexus</span> takes the hassle out of organizing, letting you focus on what matters most - connecting with loved ones and creating unforgettable experiences.</p>
                <div className="flex flex-col justify-center mt-4">
                    <div className="flex justify-center">
                        <a className="flex items-center justify-center w-[100%] mx-4 my-2 ps-5 pe-5 py-2 text-center text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed" href="./register">Sign me Up!</a>
                        <a className="flex items-center justify-center w-[100%] mx-4 my-2 ps-5 pe-5 py-2 text-center text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed" href="./map">Continue as Guest</a>
                    </div>
                    <a className="m-4 ps-5 pe-5 py-2 border-2 text-center text-black bg-transparent hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed my-auto" href="#about">Learn More</a>
                </div>
                <div className="flex justify-center">
                    <img src="hero.svg" alt="hero image" className="mt-5 object-contain w-[75%]" />
                </div>
            </section>
        </>
    )
}

export default Hero;