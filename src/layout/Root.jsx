import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import Footer from "./Footer/Footer";

const Root = () => {
    return (
        <>
            <ScrollRestoration />
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Root;