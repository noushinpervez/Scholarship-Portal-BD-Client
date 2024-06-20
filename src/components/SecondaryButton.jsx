import PropTypes from "prop-types";

const SecondaryButton = ({ children, className = "", ...props }) => {
    return (
        <button className={ `bg-primary-100 hover:bg-primary-400 font-semibold py-3 px-6 rounded w-full transition-colors duration-300 transform text-primary-900 border border-primary-400 ${className}` } { ...props }>{ children }</button>
    );
};

SecondaryButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default SecondaryButton;