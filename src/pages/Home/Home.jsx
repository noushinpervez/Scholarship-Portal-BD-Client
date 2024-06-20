import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ContactUs from "./ContactUs";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Home</title>
            </Helmet>
            
            <Banner></Banner>
            <ContactUs></ContactUs>
        </>
    );
};

export default Home;