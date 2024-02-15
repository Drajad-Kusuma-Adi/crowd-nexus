import { useEffect, useState } from "react";
import { api } from "../../guard/Api";

function Profile() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        api.get('/userinfo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setEmail(response.data.user.email);
            setName(response.data.user.name);
            setImage(response.data.user.image);
        })
        .catch((error) => {
            alert('Something went wrong, please refresh the page');
            console.log(error);
        })
    }, []);

    function uploadPhoto() {
        alert('in progress');
        // const formData = new FormData();
        // formData.append('image', event.target.files[0]);
    }

    return (
        <div className="container w-[80vw] lg:w-[50vw]">
            <br /><br />
            <div className="flex justify-between">
                <p className="font-ubuntu text-black text-4xl">Profile</p>
                <a href="/map"><img src="backArrow.svg" alt="backArrow.svg" className="w-8" /></a>
            </div>
            <br /><br />
            <div className="flex justify-center md:justify-between flex-wrap">
                <div className="flex my-4">
                    <img src={image ? image : 'userPlaceholder.svg'} alt="userProfile" className="w-32 rounded-lg me-8 hover:opacity-50 transition duration-300 hover:cursor-pointer" onClick={uploadPhoto} />
                    <div className="flex flex-col justify-center">
                        <p className="text-3xl font-bold font-ubuntu">{name}</p>
                        <p className="text-xl opacity-50 font-ubuntu-condensed">{email}</p>
                    </div>
                </div>
                <div className="flex items-center my-4">
                    <button className="text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer h-fit">
                        + New Event
                    </button>
                </div>
            </div>
            <br /><br />
            <hr />
            <br />
            <div className="flex justify-center">
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed">Events</p>
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed">Tickets</p>
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed">Wishlists</p>
            </div>
            <br />
            <hr />
        </div>
    )
}

export default Profile;