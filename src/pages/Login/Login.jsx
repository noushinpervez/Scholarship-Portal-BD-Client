import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../../components/AuthButton";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
    const { signInUser, googleLogin } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state || "/";

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "var(--accent-100)",
        iconColor: "var(--primary-500)",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await signInUser(email, password);
            setError(null);
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            });
            navigate(from);
            reset();
        } catch (error) {
            console.error(error);
            setError("Invalid email or password. Please try again!");
        }
    };

    const handleSocialLogin = async (socialProvider) => {
        try {
            const result = await socialProvider();

            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                role: "user"
            };

            const res = await axiosPublic.post("/users", userInfo);

            if (res.data) {
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });
                navigate(from);
                reset();
            }
            else {
                setError("Failed to sign in. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to sign in with Google. Please try again later.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Login</title>
            </Helmet>

            <section className="bg-accent-200">
                {/* Left half */ }
                <div className="flex justify-center min-h-screen">
                    <div className="hidden bg-no-repeat bg-contain bg-center lg:block lg:w-2/5" style={ { backgroundImage: "url('./login.svg')" } }>
                    </div>

                    {/* Right half */ }
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-bold tracking-wider capitalize">Login to Your account now.</h1>
                            <p className="mt-4 text-gray-500">Let’s get you all set up so you can begin setting up your profile.</p>

                            {/* Google sign in button */ }
                            <button className="flex items-center justify-center w-full py-4 my-6 text-sm font-medium transition duration-500 rounded-2xl text-grey-900 bg-primary-300 hover:bg-primary-500 focus:ring focus:ring-primary-500 dark:focus:ring-primary-600" onClick={ () => handleSocialLogin(googleLogin) }>
                                <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="Google Icon" />
                                Sign in with Google
                            </button>

                            <div className="flex items-center mb-3">
                                <hr className="h-0 border-b border-solid border-gray-400 grow" />
                                <p className="mx-4 text-grey-600">or</p>
                                <hr className="h-0 border-b border-solid border-gray-400 grow" />
                            </div>

                            {/* Form */ }
                            <form onSubmit={ handleSubmit(onSubmit) } className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                {/* Email */ }
                                <div>
                                    <label className="block mb-2 text-sm text-primary-800">Email address</label>
                                    <input
                                        type="email"
                                        { ...register("email", { required: "Email is required*" }) }
                                        placeholder="johndoe@mail.com"
                                        className={ `block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.email ? 'border-red-400 border-opacity-70' : 'border-transparent'}` } />

                                    {/* Email error message */ }
                                    { errors.email && <p className="mt-1 text-sm text-red-500 italic">{ errors.email.message }</p> }
                                </div>

                                {/* Password */ }
                                <div>
                                    <label className="block mb-2 text-sm text-primary-800">Password</label>
                                    <input
                                        type="password"
                                        { ...register("password", { required: "Password is required*" }) }
                                        placeholder="Enter your password"
                                        className={ `block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.password ? 'border-red-400 border-opacity-80' : 'border-transparent'}` } />

                                    {/* Password error message */ }
                                    { errors.password && (
                                        <p className="mt-1 text-sm text-red-500 italic">{ errors.password.message }</p>
                                    ) }
                                </div>

                                {/* Login button */ }
                                <AuthButton text="Login" />
                            </form>

                            {/* Firebase error message */ }
                            { error && (
                                <p className="mt-2 text-sm text-red-500 italic">{ error }</p>
                            ) }

                            {/* Link to sign up page */ }
                            <p className="mt-5 text-sm leading-relaxed text-grey-900">Not registered yet? <Link to="/signup" className="font-bold text-grey-700 hover:underline hover:text-primary-500">Create an Account</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;