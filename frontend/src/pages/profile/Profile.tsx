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

    function uploadPhoto(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();

        const token = localStorage.getItem("token");
        const formData = new FormData();

        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        api
          .post("/photo", formData, config)
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
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
                    <form encType="multipart/form-data">
                        <label htmlFor="image" className="relative">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                className="absolute w-0 h-0 opacity-0"
                                onChange={uploadPhoto}
                            />
                            <img
                                src={image ? `http://localhost:8000/storage/photos/${image}` : 'userPlaceholder.svg'}
                                alt="userProfile"
                                className="w-[125px] h-[125px] rounded-lg me-8 hover:opacity-50 transition duration-300 cursor-pointer"
                            />
                        </label>
                    </form>
                    <div className="flex flex-col justify-center">
                        <p className="text-3xl font-bold font-ubuntu">{name}</p>
                        <p className="text-xl opacity-50 font-ubuntu-condensed">{email}</p>
                    </div>
                </div>
                <div className="flex items-center my-4">
                    <a href="/event-creator" className="text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center hover:cursor-pointer px-4 py-2">
                        + New Event
                    </a>
                </div>
            </div>
            <br /><br />
            <hr />
            <br />
            <div className="flex justify-center">
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Events you've hosted so far">Events</p>
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Tickets for events you've bought">Tickets</p>
                <p className="hover:cursor-pointer hover:opacity-100 text-xl mx-4 opacity-50 font-ubuntu-condensed" title="Events you might want to go to">Wishlists</p>
            </div>
            <br />
            <hr />
            <div className="flex justify-center my-10">
                <img src="profileFooter.svg" alt="profileFooter.svg" />
            </div>
        </div>
    )
}

export default Profile;