import { useEffect, useState } from "react";
import { checkAuthentication } from "../../guard/Guard";

function Map() {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        if (checkAuthentication() !== 'guest') {
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