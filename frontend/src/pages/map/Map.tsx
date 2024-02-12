import { useEffect, useState } from "react";

function Map() {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true);
        }
    }, []);
    return (
        <div>
            <p>Map</p>
            {auth ? <p>Authenticated</p> : <p>Not Authenticated</p>}
        </div>
    )
}

export default Map;