import { useEffect, useState } from "react";
import { checkAuthentication } from "../../guard/Guard";
import { api } from "../../guard/Api";

function Map() {
    const [auth, setAuth] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    useEffect(() => {
        if (checkAuthentication() !== 'guest') {
            setAuth(true);
        }
    }, []);
    function signOut() {
        api.get('/signout', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            localStorage.removeItem('token');
            window.location.pathname = '/';
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            <p>Map</p>
            {
                auth ?
                <>
                    <p>Authenticated</p>
                    <button onClick={signOut}>Sign Out</button>
                </>
                :
                <>
                    <p>Not Authenticated</p>
                </>
            }
        </div>
    )
}

export default Map;