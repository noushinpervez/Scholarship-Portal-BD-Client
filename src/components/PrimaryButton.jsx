import PropTypes from "prop-types";

const PrimaryButton = ({ children, className = "", ...props }) => {
    return (
        <button className={ `bg-primary-500 text-white hover:bg-primary-400 font-semibold py-3 px-6 rounded w-full transition-colors duration-300 transform ${className}` } { ...props }>{ children }</button>
    );
};

PrimaryButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default PrimaryButton;