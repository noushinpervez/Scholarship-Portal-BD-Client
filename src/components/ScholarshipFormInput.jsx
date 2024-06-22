import PropTypes from "prop-types";

const ScholarshipFormInput = ({ label, value, onChange, name, type = "text", required = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">{ label }</label>
            <input
                type={ type }
                value={ value }
                onChange={ onChange }
                name={ name }
                required={ required }
                className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-2 bg-accent-100 text-sm"
            />
        </div>
    );
};

ScholarshipFormInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool
};

export default ScholarshipFormInput;