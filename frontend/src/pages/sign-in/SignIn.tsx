import { useEffect } from "react";
import { checkAuthentication } from "../../guard/Guard";
import { api } from "../../guard/Api";

function SignIn() {
    useEffect(() => {
        checkAuthentication();
    }, []);
    function signIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get('email');
        const password = formData.get('password');

        api.post('/signin', {
            email: email,
            password: password
        })
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            window.location.pathname = '/map';
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="container w-[100vw] lg:h-[100vh] flex flex-column lg:flex-row justify-evenly items-center flex-wrap p-5">
            <div>
                <p className="text-4xl font-ubuntu text-center mb-10">Sign in to Your <span className="text-blue-600">Account</span></p>
                <form onSubmit={signIn}>
                    <div className="text-center my-5">
                        <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Email Address</div>
                        <div className="flex justify-center">
                            <div className="border flex justify-center p-4"><img src="mail.svg" alt="email" className="w-[100%]" /></div>
                            <div className="border w-[100%]"><input className="font-ubuntu-condensed bg-white p-3 size-full focus:outline-none" type="email" name="email" id="email" required placeholder="youremail@example.com" /></div>
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
                        <input type="submit" value="Sign In" className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 font-ubuntu-condensed text-center w-full" />
                        <br /><br />
                        <div className="font-ubuntu-condensed">Don't have an account? <a className="ms-4" href="../register">Register</a></div>
                    </div>
                </form>
            </div>
            <div>
                <img src="signIn.svg" alt="signIn.svg" className="object-contain" />
            </div>
        </div>
    )
}

export default SignIn;