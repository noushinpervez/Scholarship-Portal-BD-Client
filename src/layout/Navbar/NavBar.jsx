import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import ThemeToggle from "../../components/ThemeToggle";
import SecondaryButton from "../../components/SecondaryButton";

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const activeLinkStyle = {
        transition: "all 0.3s ease-in-out",
        color: "var(--primary-800)",
        background: "var(--accent-100)",
        outline: "none",
    };

    return (
        <div className="w-full">
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between p-4 flex-grow">
                    {/* Logo and Title */ }
                    <Link to="/" className="text-lg font-medium tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline flex items-center gap-2">
                        <img className="w-12 lg:w-16" src="/logo.png" alt="Logo" />
                        <p className="hidden lg:block text-primary-800"><span className="font-extrabold">Scholarship</span> Portal</p></Link>

                    <div className="flex gap-3 lg:gap-6">
                        {/* Theme Toggle */ }
                        <ThemeToggle />

                        {/* User photo and tooltip */ }
                        <div className={ `group relative flex flex-col items-center ${user ? 'block' : 'hidden'}` }>
                            <img alt={ user?.displayName } className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-primary-500" src={ user?.photoURL || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" } />

                            {/* Username tooltip */ }
                            <div className="absolute top-0 flex flex-col items-center hidden mt-8 group-hover:flex">
                                <div className="w-3 h-3 -mb-2 rotate-45 bg-black"></div>
                                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-nowrap bg-primary-300 shadow-lg">{ user?.displayName }</span>
                            </div>
                        </div>

                        {/* Hamburger Menu Button */ }
                        <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={ () => setOpen(!open) }>
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                { open ? (
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                ) : (
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                ) }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Links */ }
                <nav className={ `flex-col pb-4 md:pb-0 md:flex md:justify-end md:flex-row md:items-center ${open ? "flex" : "hidden"}` }>
                    <NavLink to="/" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded md:mt-0 md:ml-4 hover:text-primary-600 hover:bg-primary-100" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>Home</NavLink>

                    <NavLink to="/all-scholarship" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded focus:text-primary-600 md:mt-0 md:ml-4 hover:text-primary-600 hover:bg-primary-100 focus:bg-primary-100 focus:outline-none focus:shadow-outline" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>All Scholarship</NavLink>

                    <NavLink to="/dashboard/profile" className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded focus:text-primary-600 md:mt-0 md:ml-4 hover:text-primary-600 hover:bg-primary-100 focus:bg-primary-100 focus:outline-none focus:shadow-outline" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>Dashboard</NavLink>

                    {/* Login or Logout Button */ }
                    {
                        user ? <div onClick={ handleLogout } className="mt-4 md:mt-0 md:ml-4"><SecondaryButton>Logout</SecondaryButton></div> : <Link to="/login" className="mt-4 md:mt-0 md:ml-4">
                            <PrimaryButton>Login</PrimaryButton>
                        </Link>
                    }
                </nav>
            </div>
        </div>
    );
}

export default NavBar;