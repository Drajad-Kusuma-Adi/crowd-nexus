function Header() {
    return (
        <header className="sticky top-0 z-50 w-[100vw]" style={{backgroundColor: "#F3F6FF"}}>
            <div className="hidden lg:grid p-5 grid-cols-3 gap-4">
                <div className="flex justify-center items-center">
                    <img src="logo.svg" alt="crowd nexus logo" width={50} />
                    <p className="ps-5 pe-5 text-2xl font-ubuntu-condensed ml-4">Crowd Nexus</p>
                </div>
                <div className="flex justify-center items-center">
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#home">Home</a>
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#about">About</a>
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#faq">FAQ</a>
                </div>
                <div className="flex justify-center items-center">
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="./register">Register</a>
                    <a className="ps-5 pe-5 text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 font-ubuntu-condensed text-center" href="./sign-in">Sign In</a>
                </div>
            </div>
            <div className="lg:hidden p-5">
                <div className="my-4 flex justify-between items-center">
                    <div className="flex items-center">
                    <img src="logo.svg" alt="crowd nexus logo" width={75} />
                    <p className="text-2xl font-ubuntu-condensed ml-4">Crowd Nexus</p>
                    </div>
                    <div className="flex items-center flex-col">
                    <a className="ps-5 pe-5 py-2 text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg font-ubuntu-condensed text-center" href="./sign-in">Sign In</a>
                    {/* <a className="ps-5 pe-5 font-ubuntu-condensed" href="">Register</a> */}
                    </div>
                </div>
                <hr />
                <div className="my-4 flex justify-center items-center">
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#home">Home</a>
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#about">About</a>
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#faq">FAQ</a>
                </div>
            </div>
        </header>
    )
}

export default Header;