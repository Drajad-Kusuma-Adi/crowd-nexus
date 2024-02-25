function Loading() {
    const trivias = [
        "The first online ticketing service was launched in 1995 by Ticketmaster, which allowed customers to buy tickets for concerts, sports, and other events over the internet.",
        "The largest event ever organized by a single company was the Live Aid concert in 1985, which raised over $127 million for famine relief in Africa. The concert was held simultaneously in London and Philadelphia, and featured performances by Queen, U2, Madonna, and many others.",
        "The most expensive event ticket ever sold was for the 2012 Summer Olympics opening ceremony in London, which cost $2600. The ticket included access to a VIP lounge, champagne reception, and a three-course meal.",
        "The most popular event theme in 2020 was virtual events, as the COVID-19 pandemic forced many organizers to shift their events online. According to a survey by Eventbrite, 71% of event creators hosted a virtual event in 2020, and 94% plan to do so in 2021.",
        "The most common event planning mistake is not having a contingency plan, according to a study by EventMB. The study found that 44% of event planners have experienced a major disruption at their events, such as weather, venue, or speaker issues, and only 26% had a backup plan in place.",
        "The most successful event marketing strategy is word-of-mouth, according to a report by Eventbrite. The report found that 50% of event attendees heard about an event from a friend or family member, and 38% said they are more likely to attend an event if someone they know is going.",
        "The most innovative event technology in 2021 is augmented reality (AR), according to a report by Cvent. The report predicted that AR will be used to create immersive and interactive experiences for event attendees, such as virtual tours, product demos, and gamification.",
        "The most environmentally friendly event venue in the world is the Vancouver Convention Centre in Canada, which has a LEED Platinum certification. The venue features a six-acre living roof, a seawater heating and cooling system, and a rainwater collection system.",
        "The most influential event planner in the world is David Tutera, according to BizBash. Tutera is a celebrity wedding and event planner, who has worked with clients such as Jennifer Lopez, Elton John, and Prince Charles. He also hosts his own TV show, David Tutera’s CELEBrations.",
        "The most attended event in history was the Kumbh Mela festival in India in 2013, which attracted over 120 million pilgrims over 55 days. The festival is a Hindu religious gathering that takes place every 12 years at the confluence of the Ganges, Yamuna, and Saraswati rivers."
        ];
    return (
        <div className="container px-4 flex flex-col justify-center items-center w-[100vw] h-[100vh]">
            <div className="flex justify-center items-center">
                <a href="https://www.flaticon.com/free-animated-icons/spaceship" title="spaceship animated icons"><img src="rocket-launch.gif" alt="https://www.flaticon.com/free-animated-icons/spaceship" className="w-[100px] object-contain" /></a>
                <p className="font-ubuntu text-xl font-bold">Loading</p>
            </div>
            <p className="font-ubuntu text-2xl font-bold">Did you know?</p>
            <p className="font-ubuntu-condensed text-center text-base font-bold">{trivias[Math.floor(Math.random() * trivias.length)]}</p>
        </div>
    );
}

export default Loading;