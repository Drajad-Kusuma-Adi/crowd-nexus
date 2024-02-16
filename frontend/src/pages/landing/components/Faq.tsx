import Accordion from "../../../components/Accordion";

function Faq() {
    return (
        <>
            <section id="faq">
                <p className="text-4xl font-ubuntu">FAQ (Frequently Asked Questions)</p>
                <br />
                {/* <img src="faq.svg" alt="faq" /> */}
                <br />
                <Accordion header="What are the event types allowed?" content="Almost anything! We don't limit the type of event you can host and market on our platform, as long as it doesn't break our Terms of Service." />
                <hr /><br />
                <Accordion header="What information are in each event?" content="The event organizer must specify title, description, date, time, location, image, and at least a ticket choice." />
                <hr /><br />
                <Accordion header="How does Crowd Nexus ensure the security of my event information and guest data?" content="Rest assured, Crowd Nexus uses the latest security technologies to protect your data. For more information check our privacy policy." />
                <hr /><br />
                <Accordion header="Can I create an open event that doesn't require paid ticket?" content="Yes, you can specify free a ticket option in the event creator tool." />
            </section>
        </>
    )
}

export default Faq;