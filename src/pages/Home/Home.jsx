import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import TopScholarship from "./TopScholarship";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Scholarship Portal | Home</title>
            </Helmet>
            
            <Banner></Banner>
            <TopScholarship></TopScholarship>
            <ContactUs></ContactUs>
        </>
    );
};

export default Home;