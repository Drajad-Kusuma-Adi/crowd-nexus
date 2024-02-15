function Hero() {
    return (
        <>
            <section id="home">
                <p className="text-4xl font-ubuntu"><span className="text-blue-600">Technology</span> and <span className="text-blue-600">Real World</span> combined!</p>
                <p className="mt-5 text-xl opacity-50 font-ubuntu-condensed">Who said technology should distances ourselves from society? Leverage the power of <span className="text-blue-600">Crowd Nexus</span> to organize a get-together seamlessly!</p>
                <div className="flex flex-col justify-center mt-4">
                    <div className="flex justify-center">
                        <a className="w-[100%] mx-4 my-2 ps-5 pe-5 py-2 text-center text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed" href="./register">Sign me Up!</a>
                        <a className="w-[100%] mx-4 my-2 ps-5 pe-5 py-2 text-center text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed" href="./map">Continue as Guest</a>
                    </div>
                    <a className="m-4 ps-5 pe-5 py-2 border-2 text-center text-black bg-transparent hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed my-auto" href="#about">Learn More</a>
                </div>
                <img src="hero.svg" alt="hero image" className="mt-5" />
            </section>
        </>
    )
}

export default Hero;