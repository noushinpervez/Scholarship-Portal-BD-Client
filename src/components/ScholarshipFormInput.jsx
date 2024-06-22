import PropTypes from 'prop-types';

const ScholarshipFormInput = ({ label, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">{ label }</label>
            <input
                type="text"
                className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1 px-2 bg-accent-100 text-sm"
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

ScholarshipFormInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

export default ScholarshipFormInput;