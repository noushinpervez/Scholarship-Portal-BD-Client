import PropTypes from 'prop-types';

const ScholarshipFormOptionInput = ({ label, value, options, onChange, name, required = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">{ label }</label>
            <select
                className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1.5 bg-accent-100"
                value={ value }
                onChange={ onChange }
                name={ name }
                required={ required }
            >
                <option value="">None</option>
                { options.map((option) => (
                    <option key={ option } value={ option }>
                        { option }
                    </option>
                )) }
            </select>
        </div>
    );
};

ScholarshipFormOptionInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    name: PropTypes.string,
    required: PropTypes.bool,
};

export default ScholarshipFormOptionInput;