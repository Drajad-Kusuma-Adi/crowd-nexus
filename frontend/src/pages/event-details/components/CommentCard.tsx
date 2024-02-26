import { useEffect, useState } from "react";
import { api } from "../../../guard/Api";

function CommentCard({comment}: {comment: {users_id: number, events_id: number, comment: string, date: string}}) {
    const [user, setUser] = useState({});

    useEffect(() => {
        api.get('/checkToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div className="my-2 w-[90%] flex flex-col items-start justify-center py-4 px-8">
            <div className="flex justify-center items-center">
            <img className="w-[50px] h-[50px] rounded-full me-4" src={user.image !== null ? ('http://localhost:8000/storage/photos/' + user.image) : 'userPlaceholder.svg'} alt={user.name} />
                <p className='text-2xl font-bold me-2'>{user.name}</p>
                <p className='text-sm opacity-50'>Commented on {comment.date}</p>
            </div>
            <br />
            <p className="opacity-50">{comment.comment}</p>
        </div>
    )
}

export default CommentCard;