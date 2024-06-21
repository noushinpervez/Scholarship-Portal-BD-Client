import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthButton from "../../components/AuthButton";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const from = "/";

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
        const { fullName, photoURL, email, password } = data;

        try {
            await createUser(email, password);
            await updateUserProfile(fullName, photoURL);

            const userInfo = {
                name: fullName,
                email: email,
                role: "user"
            };

            const res = await axiosPublic.post("/users", userInfo);
            
            if (res.data.insertedId) {
                reset();
                navigate(from);
                Toast.fire({
                    icon: "success",
                    title: "Signed up successfully"
                });
            }
            else {
                setError("Failed to sign up. Please try again later.");
            }
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already in use. Please use a different email.");
            }
            else {
                console.error(error);
                setError("Failed to sign up. Please try again later.");
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Sign Up</title>
            </Helmet>

            <section className="bg-accent-200">
                <div className="flex justify-center min-h-screen">
                    {/* Left half */ }
                    <div className="hidden bg-no-repeat bg-contain bg-center lg:block lg:w-2/5" style={ { backgroundImage: "url('./signup.svg')" } }>
                    </div>

                    {/* Right half */ }
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <h1 className="text-2xl font-bold tracking-wider capitalize">Get your free account now.</h1>
                            <p className="mt-4 text-gray-500">Let’s get you all set up so you can begin setting up your profile.</p>

                            {/* Form */ }
                            <form onSubmit={ handleSubmit(onSubmit) } className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                {/* Full name */ }
                                <div>
                                    <label className="block mb-2 text-sm text-primary-800">Name</label>
                                    <input
                                        type="text"
                                        { ...register("fullName", {
                                            required: "Full name is required*",
                                            pattern: {
                                                value: /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/,
                                                message: "Enter a valid full name*"
                                            },
                                            validate: {
                                                hasTwoWords: value => value.trim().split(" ").length >= 2 || "Full name must contain at least two words*"
                                            }
                                        }) }
                                        placeholder="John Doe"
                                        className={ `block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.fullName ? 'border-red-400 border-opacity-70' : 'border-transparent'}` } />

                                    {/* Full name error message */ }
                                    { errors.fullName && <p className="mt-1 text-sm text-red-500 italic">{ errors.fullName.message }</p> }
                                </div>

                                {/* Photo url */ }
                                <div>
                                    <label className="block mb-2 text-sm text-primary-800">Photo URL</label>
                                    <input
                                        type="url"
                                        { ...register("photoURL", {
                                            required: "Photo URL is required*",
                                            pattern: {
                                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
                                                message: "Enter a valid image URL*"
                                            }
                                        }) }
                                        placeholder="Enter your photo url"
                                        className={ `block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.photoURL ? 'border-red-400 border-opacity-70' : 'border-transparent'}` } />

                                    {/* Photo url error message */ }
                                    { errors.photoURL && <p className="mt-1 text-sm text-red-500 italic">{ errors.photoURL.message }</p> }
                                </div>

                                {/* Email */ }
                                <div>
                                    <label className="block mb-2 text-sm text-primary-800">Email address</label>
                                    <input
                                        type="email"
                                        { ...register("email", {
                                            required: "Email is required*",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Enter a valid email address*"
                                            }
                                        }) }
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
                                        { ...register("password", {
                                            required: "Password is required*", minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters long*"
                                            }, validate: {
                                                hasCapitalLetter: value => /[A-Z]/.test(value) || "Password must contain at least one capital letter*",
                                                hasSpecialCharacter: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character*"
                                            }
                                        }) }
                                        placeholder="Enter your password"
                                        className={ `block w-full px-5 py-3 mt-2 bg-accent-50 placeholder-gray-500 rounded focus:ring-primary-700 focus:outline-none focus:ring border-2 ${errors.password ? 'border-red-400 border-opacity-70' : 'border-transparent'}` } />

                                    {/* Password error message */ }
                                    { errors.password && (
                                        <p className="mt-1 text-sm text-red-500 italic">{ errors.password.message }</p>
                                    ) }
                                </div>

                                {/* Sign up button */ }
                                <AuthButton text="Sign Up" />
                            </form>

                            {/* Firebase error message */ }
                            { error && (
                                <p className="mt-2 text-sm text-red-500 italic">{ error }</p>
                            ) }

                            {/* Link to login page */ }
                            <p className="mt-5 text-sm leading-relaxed text-grey-900">Already registered? <Link to="/login" className="font-bold text-grey-700 hover:underline hover:text-primary-500">Login to your Account</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;