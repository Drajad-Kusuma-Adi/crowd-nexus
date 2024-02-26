import { useState, useEffect } from "react";
import { api } from "../../../guard/Api";
import CommentCard from "./CommentCard";

function Comments() {
    const searchParams = new URLSearchParams(window.location.search);
    const event_id = searchParams.get("id");
    type Comment = { user_id: number; event_id: number; comment: FormDataEntryValue; date: string; };
    const [comments, setComments] = useState<Comment[]>([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get('/checkToken', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
            setUser(response.data.user);
        })
        .catch((error) => {
            console.log(error);
        });

        api.get('/getComments', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                event_id: event_id
            }
        })
        .then((response) => {
            setComments(response.data.comments);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function sendComment(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        api.post('/sendComment', {
            user_id: user.id,
            event_id: event_id,
            comment: formData.get('comment'),
            date: new Date().toLocaleDateString()
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            setComments([...comments, {
                user_id: user.id,
                event_id: event_id,
                comment: formData.get('comment'),
                date: new Date().toLocaleDateString()
            }]);
        })
    }

    if (user !== undefined && user !== null) {
        return (
            <div className="p-4 mx-8 border border-black rounded-lg">
                <p className="font-ubuntu-condensed text-xl opacity-50">Comments</p>
                <br />
                <div className="flex justify-start items-center">
                        <img src={user.image !== null ? ('http://localhost:8000/storage/photos/' + user.image) : 'userPlaceholder.svg'} alt="user profile" className="w-[50px] rounded-full" />
                        <form onSubmit={sendComment} className="w-full flex items-center">
                            <input type="text" className="w-[90%] h-[75px] bg-white rounded-lg mx-4 p-4 border border-black" name="comment" id="comment" placeholder="Add your thoughts..."></input>
                            <input className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 hover:text-white rounded-lg hover:cursor-pointer" type="submit" value="Send" />
                        </form>
                    </div>
                <br /><hr /><br />
                {comments.map((comment, index) => {
                    return (
                        <CommentCard key={index} comment={comment} />
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="p-4 mx-8 border border-black rounded-lg">
                <p className="font-ubuntu-condensed text-xl opacity-50">Comments</p>
                <br />
                <div className="flex justify-start items-center font-ubuntu-condensed">You need to be logged in to comment</div>
                <br /><hr /><br />
                {comments.map((comment, index) => {
                    return (
                        <CommentCard key={index} comment={comment} />
                    )
                })}
            </div>
        )
    }
}

export default Comments;