import PropTypes from "prop-types";

const Title = ({ title }) => {
    return (
        <h2 className="text-center mb-12 px-6 text-3xl font-bold text-accent-600">
            { title }
        </h2>
    );
};

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;