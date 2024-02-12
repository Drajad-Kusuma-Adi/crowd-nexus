import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import { checkAuthentication } from "../../guard/Guard";
import { useEffect } from "react";

function Landing() {
    useEffect(() => {
        checkAuthentication();
    }, []);
    return (
        <div className="container w-[100vw]">
            <Header/>
            <div className="container px-[10%] lg:px-[30%] text-center my-10">
                <Hero/>
                <br /><hr /><br />
                <About/>
                <br /><hr /><br />
                <Faq/>
            </div>
            <Footer/>
        </div>
    )
}

export default Landing;