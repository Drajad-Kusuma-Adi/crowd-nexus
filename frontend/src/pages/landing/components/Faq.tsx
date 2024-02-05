import Accordion from "../../../components/Accordion";

function Faq() {
    return (
        <>
            <section id="faq">
                <p className="text-4xl font-ubuntu">FAQ (Frequently Asked Questions)</p>
                <br />
                <img src="faq.svg" alt="faq" />
                <br />
                <Accordion header="What are the event types allowed?" content="Almost anything! We don't limit the type of event you can host and market on our platform, as long as it doesn't break our Terms of Service." />
                <hr /><br />
                <Accordion header="What information are in each event?" content="The event organizer must specify title, description, and at least a ticket choice. In addition, they can add an image and tags." />
                <hr /><br />
                <Accordion header="Can I manually search for an event?" content="Yes, you can. In addition to recommendation based on your location, we also provide search box to find the name of specific event." />
            </section>
        </>
    )
}

export default Faq;