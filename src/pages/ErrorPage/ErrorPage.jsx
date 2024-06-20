import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen py-8 page md:py-16 bg-accent-100">
            <div className="relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16">
                <p className="text-9xl md:text-[300px] w-full select-none text-center font-black text-gray-400">404</p>
                <p className="text-2xl font-bold capitalize">You have discovered a secret place</p>
                <p className="text-xl font-medium break-words">Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.</p>

                {/* Go back buttons */ }
                <div className="flex flex-col justify-between w-full gap-8 md:flex-row md:gap-32 xl:px-16">
                    <button onClick={ goBack } className="flex items-center justify-center w-full gap-4 p-3 font-semibold capitalize border-2 border-primary-500 rounded shadow-lg md:w-fit transition-all duration-500 ease-in-out hover:scale-105 hover:bg-primary-500 md:p-6 focus:outline-none active:scale-90 hover:shadow-xl hover:text-[#eaf0fa] text-center"><span className="rotate-180 material-symbols-outlined">arrow_right_alt</span>Go back to Previous Page</button>

                    <Link to="/" className="rounded flex w-full md:w-fit group items-center gap-4 justify-center border-2 border-accent-500 font-semibold hover:bg-accent-500 p-3 md:p-6 capitalize focus:outline-none hover:scale-105 transition-all duration-500 ease-in-out hover:text-[#eaf0fa] active:scale-90 shadow-lg hover:shadow-xl"><span className="material-symbols-outlined">home</span>Go back to Home Page</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;