function Register() {
    return (
        <div className="container w-[100vw] lg:h-[100vh] flex flex-column lg:flex-row justify-evenly items-center flex-wrap p-5">
                <div>
                    <p className="text-4xl font-ubuntu text-center">Register Your <span className="text-blue-600">Account</span></p>
                    <img src="register.svg" alt="register.svg" className="object-contain" />
                </div>
                <div>
                    <form>
                        <div className="text-center my-5">
                            <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Email Address</div>
                            <div className="flex justify-center">
                                <div className="border"><img src="mail.svg" alt="email" className="object-none m-4" /></div>
                                <div className="border"><input className="font-ubuntu-condensed w-[250px] bg-white p-3 size-full focus:outline-none" type="email" name="email" id="email" required placeholder="youremail@example.com" /></div>
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Full Name</div>
                            <div className="flex justify-center">
                                <div className="border"><img src="person.svg" alt="name" className="object-none m-4" /></div>
                                <div className="border"><input className="font-ubuntu-condensed w-[250px] bg-white p-3 size-full focus:outline-none" type="text" name="name" id="name" required placeholder="John Doe" /></div>
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <div className="font-ubuntu-condensed text-2xl opacity-50 mb-2">Password</div>
                            <div className="flex justify-center">
                                <div className="border"><img src="lock.svg" alt="password" className="object-none m-4" /></div>
                                <div className="border"><input className="font-ubuntu-condensed w-[250px] bg-white p-3 size-full focus:outline-none" type="password" name="password" id="password" required placeholder="*******" /></div>
                            </div>
                        </div>
                        <div className="text-center my-5">
                            <input type="submit" value="Register" className="text-white bg-blue-600 hover:bg-blue-700 hover:text-white transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 font-ubuntu-condensed text-center w-full" />
                            <br /><br />
                            <div className="font-ubuntu-condensed">Already have an account? <a className="ms-4" href="../sign-in">Sign In</a></div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Register;