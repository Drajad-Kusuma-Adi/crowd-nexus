import { api } from "../../guard/Api";

function EventCreator() {
    return (
        <div className="container w-[80vw]">
            <br /><br />
            <p className="text-center">Event Creator</p>
            <form className="text-center" encType="multipart/form-data">
                <label htmlFor="title">Event Title</label>
                <br />
                <input type="text" name="title" id="title" placeholder="Enter event name..." />
                <br />
                <label htmlFor="description">Event Description</label>
                <br />
                <textarea name="description" id="description" placeholder="Write an elaborate description on what will happen on your event..."></textarea>
                <br />
                <div className="flex justify-center flex-wrap">
                    <div className="mx-4">
                        <label htmlFor="date">Date</label>
                        <br />
                        <input type="date" name="date" id="date" />
                    </div>
                    <div className="flex">
                        <div className="">
                            <label htmlFor="startTime">Start Time</label>
                            <br />
                            <input type="time" name="startTime" id="startTime" />
                        </div>
                        <div className="">
                            <label htmlFor="endTime">End Time</label>
                            <br />
                            <input type="time" name="endTime" id="endTime" />
                        </div>
                    </div>
                </div>
                <br />
                <label htmlFor="image">Event Image</label>
                <br />
                <input type="file" name="image" id="image" />
                <br />
                <label htmlFor="location">Event Location</label>
                <input type="text" name="location" id="location" placeholder="Enter event location..." />
            </form>
        </div>
    )
}

export default EventCreator;