import { useState } from 'react';
import ScholarshipFormInput from '../../components/ScholarshipFormInput';

const ScholarshipForm = ({ universityName, scholarshipCategory, subjectCategory }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        photo: '',
        address: '',
        gender: '',
        applyingDegree: '',
        sscResult: '',
        hscResult: '',
        studyGap: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
        console.log(formData);
    };

    return (
        <form onSubmit={ handleSubmit }>
            <ScholarshipFormInput
                label="Applicant Phone Number"
                name="phoneNumber"
                value={ formData.phoneNumber }
                onChange={ handleChange }
                required
            />
            <ScholarshipFormInput
                label="Applicant Photo URL"
                name="photo"
                value={ formData.photo }
                onChange={ handleChange }
                required
            />
            <ScholarshipFormInput
                label="Applicant Address"
                name="address"
                value={ formData.address }
                onChange={ handleChange }
                required
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <select
                    name="gender"
                    value={ formData.gender }
                    onChange={ handleChange }
                    required
                    className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1 px-2 bg-accent-100 text-sm"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Applying Degree</label>
                <select
                    name="applyingDegree"
                    value={ formData.applyingDegree }
                    onChange={ handleChange }
                    required
                    className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1 px-2 bg-accent-100 text-sm"
                >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                </select>
            </div>
            <ScholarshipFormInput
                label="SSC Result"
                name="sscResult"
                value={ formData.sscResult }
                onChange={ handleChange }
                required
            />
            <ScholarshipFormInput
                label="HSC Result"
                name="hscResult"
                value={ formData.hscResult }
                onChange={ handleChange }
                required
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-500">Study Gap (if any)</label>
                <select
                    name="studyGap"
                    value={ formData.studyGap }
                    onChange={ handleChange }
                    className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1 px-2 bg-accent-100 text-sm"
                >
                    <option value="">Select Study Gap</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="More">More</option>
                </select>
            </div>
            <ScholarshipFormInput
                label="University Name"
                name="universityName"
                value={ universityName }
                onChange={ handleChange }
                readOnly
            />
            <ScholarshipFormInput
                label="Scholarship Category"
                name="scholarshipCategory"
                value={ scholarshipCategory }
                onChange={ handleChange }
                readOnly
            />
            <ScholarshipFormInput
                label="Subject Category"
                name="subjectCategory"
                value={ subjectCategory }
                onChange={ handleChange }
                readOnly
            />
            <button type="submit" className="w-full mt-4 p-2 bg-primary-500 text-white rounded">
                Submit
            </button>
        </form>
    );
};

export default ScholarshipForm;