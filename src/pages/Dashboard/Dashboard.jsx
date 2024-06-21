import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    
    const activeLinkStyle = {
        transition: "all 0.3s ease-in-out",
        color: "var(--text-800)",
        background: "var(--accent-100)",
        outline: "none",
    };

    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Dashboard</title>
            </Helmet>

            <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
                <div className="flex flex-col w-full md:w-64 bg-accent-700 flex-shrink-0">
                    <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                        <p className="text-lg font-semibold tracking-widest text-text-100 uppercase rounded-lg focus:outline-none focus:shadow-outline">Dashboard</p>
                        <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={ () => setOpen(!open) }>
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                {
                                    open ? (
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    ) : (
                                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
                                    )
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Sidebar */}
                    <nav className={ `flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${open ? "block" : "hidden"}` }>
                        <NavLink to="/dashboard/profile" className="block px-4 py-2 mt-2 text-sm font-semibold text-text-100 rounded-lg hover:text-gray-900 
                        focus:text-text-800 hover:bg-accent-100 hover:text-text-800 focus:outline-none focus:shadow-outline" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>My Profile</NavLink>

                        <NavLink to="/dashboard/application" className="block px-4 py-2 mt-2 text-sm font-semibold text-text-100 bg-transparent rounded-lg dark:bg-transparent hover:text-gray-900
                        focus:text-text-800 hover:bg-accent-100 hover:text-text-800 focus:outline-none focus:shadow-outline" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>My Application</NavLink>

                        <NavLink to="/dashboard/reviews" className="block px-4 py-2 mt-2 text-sm font-semibold text-text-100 bg-transparent rounded-lg dark:bg-transparent hover:text-gray-900 hover:bg-accent-100 hover:text-text-800 
                        focus:text-text-800 focus:outline-none focus:shadow-outline" style={ ({ isActive }) => (isActive ? activeLinkStyle : {}) }>My Reviews</NavLink>

                        <div className="border-b border-gray-300 my-2"></div>

                        <NavLink to="/" className="block px-4 py-2 mt-2 text-sm font-semibold text-text-100 bg-transparent rounded-lg dark:bg-transparent hover:text-gray-900 hover:bg-accent-100 hover:text-text-800 focus:text-text-800 focus:outline-none focus:shadow-outline">Home</NavLink>
                    </nav>
                </div>

                {/* Dashboard content */}
                <main className="flex-grow px-4 py-5 sm:px-6">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Dashboard;