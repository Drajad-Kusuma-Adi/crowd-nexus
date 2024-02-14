import { useEffect, useState } from "react";
import { api } from "../../guard/Api";

function Profile() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        api.get('/userinfo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setEmail(response.data.user.email);
            setName(response.data.user.name);
        })
        .catch((error) => {
            alert('Something went wrong, please refresh the page');
            console.log(error);
        })
    }, []);
    return (
        <div className="container w-[100vw]">
            <br /><br />
            <p className="font-ubuntu text-black text-4xl">Profile</p>

        </div>
    )
}

export default Profile;