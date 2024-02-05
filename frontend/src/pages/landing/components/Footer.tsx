function Footer() {
    return (
        <footer style={{backgroundColor: "#F3F6FF"}}>
            <div className="p-5">
                <div className="my-4 flex justify-center items-center">
                    <div className="flex items-center">
                    <img src="logo.svg" alt="crowd nexus logo" width={75} />
                    <p className="text-2xl font-ubuntu-condensed ml-4">Crowd Nexus</p>
                    </div>
                </div>
                <hr />
                <div className="my-4 flex justify-center items-center">
                <a className="ps-5 pe-5 font-ubuntu-condensed" href="#">Terms of Service</a>
                    <a className="ps-5 pe-5 font-ubuntu-condensed" href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;