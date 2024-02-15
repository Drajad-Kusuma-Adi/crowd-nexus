import { useState } from "react";
import { api } from "../../guard/Api";

function Register() {
    const [userExist, setUserExist] = useState(false);

    function register(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get('email');
        const name = formData.get('name');
        const password = formData.get('password');

        api.post('/register', {
            email: email,
            name: name,
            password: password
        })
        .then((response) => {
            if (response.data.message === "User already exist") {
                setUserExist(true);
            } else {
                window.location.pathname = '/sign-in';
            }
        })
        .catch((error) => {
            console.log(error);
            alert('Something went wrong, please try again');
        })
    }
    return (
        <div className="container w-[100vw] lg:h-[100vh] flex flex-column lg:flex-row justify-evenly items-center flex-wrap p-5">
            <div>
                <p className="text-4xl font-ubuntu text-center my-10">Register Your <span className="text-blue-600">Account</span></p>
                <img src="register.svg" alt="register.svg" className="object-contain my-10" />
            </div>
            <div>
                <form onSubmit={register}>
                    <div className="text-center my-5">
                        <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Email Address</div>
                        <div className="flex justify-center">
                            <div className="border flex justify-center p-4"><img src="mail.svg" alt="email" className="w-[100%]" /></div>
                            <div className="border w-[100%]"><input className="font-ubuntu-condensed bg-white p-3 size-full focus:outline-none" type="email" name="email" id="email" required placeholder="youremail@example.com" /></div>
                        </div>
                    </div>
                    <div className="text-center my-5">
                        <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Full Name</div>
                        <div className="flex justify-center">
                            <div className="border flex justify-center p-4"><img src="person.svg" alt="name" className="w-[100%]" /></div>
                            <div className="border w-[100%]"><input className="font-ubuntu-condensed bg-white p-3 size-full focus:outline-none" type="text" name="name" id="name" required placeholder="John Doe" /></div>
                        </div>
                    </div>
                    <div className="text-center my-5">
                        <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Password</div>
                        <div className="flex justify-center">
                            <div className="border flex justify-center p-4"><img src="lock.svg" alt="password" className="w-[100%]" /></div>
                            <div className="border w-[100%]"><input className="font-ubuntu-condensed bg-white p-3 size-full focus:outline-none" type="password" name="password" id="password" required placeholder="*******" /></div>
                        </div>
                    </div>
                    <div className="text-center my-5">
                        <input type="submit" value="Register" className="text-white bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 font-ubuntu-condensed text-center w-full hover:cursor-pointer" />
                        <br /><br />
                        <div className="font-ubuntu-condensed">Already have an account? <a className="ms-4" href="../sign-in">Sign In</a></div>
                        <br /><br />
                        <div className="font-ubuntu-condensed text-white bg-red-600 py-4 px-4 rounded-lg" hidden={!userExist}>⚠️ This user already registered, please sign in instead.</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;