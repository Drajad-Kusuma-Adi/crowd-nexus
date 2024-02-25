function Comments() {
    return (
        <div className="p-4 mx-8 border border-black rounded-lg">
            <p className="font-ubuntu-condensed text-xl opacity-50">Comments</p>
            <br />
            <div className="flex justify-start items-center">
                <img src="userPlaceholder.svg" alt="user profile" className="w-[50px] rounded-full" />
                <form className="w-full">
                    <textarea className="w-[90%] bg-white rounded-lg mx-4 p-4 border border-black" name="comment" id="comment" placeholder="Add your thoughts..."></textarea>
                </form>
            </div>
        </div>
    )
}

export default Comments;