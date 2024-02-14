function NotFound() {
    return (
        <div className="flex justify-evenly items-center w-[100vw] h-[100vh] flex-wrap">
            <img src="notFound.svg" alt="notFound.svg" className="object-contain w-[80vw] lg:w-[40vw]" />
            <div className="text-center w-[80%] lg:w-[40%]">
                <p className="m-2 font-ubuntu text-blue-600 text-4xl">Aliens!</p>
                <p className="m-2 font-ubuntu-condensed text-xl">
                    Wandering the unknown sector of <span className="text-blue-600">Crowd Nexus</span>, eh? Well, unless we want to hang out with our extraterrestrial buddies, let's <a href="/" className="underline">go back</a>.
                </p>
                <br />
            </div>
        </div>
    )
}

export default NotFound;