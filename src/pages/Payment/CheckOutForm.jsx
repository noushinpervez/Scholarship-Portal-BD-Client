import { useState } from "react";
import ScholarshipFormInput from "../../components/ScholarshipFormInput";
import ScholarshipFormOptionInput from "../../components/ScholarshipFormOptionInput";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ScholarshipForm = ({ universityName, scholarshipCategory, subjectCategory }) => {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        photo: "",
        address: "",
        gender: "",
        applyingDegree: "",
        sscResult: "",
        hscResult: "",
        studyGap: ""
    });

    const axiosPublic = useAxiosPublic();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPublic.post("/applied-scholarships", formData);
            console.log(response.data);
            setFormData({
                phoneNumber: "",
                photo: "",
                address: "",
                gender: "",
                applyingDegree: "",
                sscResult: "",
                hscResult: "",
                studyGap: ""
            });

            Swal.fire({
                title: "Applied for Scholarship!",
                text: "Your scholarship application has been submitted successfully.",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "There was an error while submitting your application. Please try again later.",
                icon: "error",
                confirmButtonColor: "#d33",
                background: "var(--accent-100)",
            });
        }
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
            <ScholarshipFormOptionInput
                label="Gender"
                name="gender"
                value={ formData.gender }
                options={ ["Male", "Female", "Other"] }
                onChange={ handleChange }
                required
            />
            <ScholarshipFormOptionInput
                label="Applying Degree"
                name="applyingDegree"
                value={ formData.applyingDegree }
                options={ ["Diploma", "Bachelor", "Masters"] }
                onChange={ handleChange }
                required
            />
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
            <ScholarshipFormOptionInput
                label="Study Gap (if any)"
                name="studyGap"
                value={ formData.studyGap }
                options={ ["1 Year", "2 Years", "3 Years", "More"] }
                onChange={ handleChange }
            />
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