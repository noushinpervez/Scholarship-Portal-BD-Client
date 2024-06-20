import PropTypes from "prop-types";

const AuthButton = ({ text }) => {
    return (
        <button type="submit" className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-500 transform bg-primary-500 rounded hover:bg-primary-400 focus:ring focus:ring-primary-500 dark:focus:ring-primary-600">
            <span>{ text }</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </button>
    );
};

AuthButton.propTypes = {
    text: PropTypes.string,
};

export default AuthButton;