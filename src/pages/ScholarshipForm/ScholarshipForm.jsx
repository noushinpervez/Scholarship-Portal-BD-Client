import PropTypes from "prop-types";
import { useState } from "react";
import ScholarshipFormInput from "../../components/ScholarshipFormInput";
import ScholarshipFormOptionInput from "../../components/ScholarshipFormOptionInput";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";

const ScholarshipForm = ({ universityName, scholarshipCategory, subjectCategory, applicationFees, serviceCharge }) => {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        photo: "",
        address: "",
        gender: "",
        applyingDegree: "",
        sscResult: "",
        hscResult: "",
        studyGap: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { id } = useParams();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "var(--accent-100)",
        iconColor: "var(--primary-500)",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const ToastError = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "var(--accent-100)",
        iconColor: "#d33",
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const todayDate = new Date().toISOString().split('T')[0];

            const formDataExtra = {
                ...formData,
                universityName: universityName,
                scholarshipCategory: scholarshipCategory,
                subjectCategory: subjectCategory,
                applicationFees: applicationFees,
                serviceCharge: serviceCharge,
                userName: user.displayName,
                userEmail: user.email,
                scholarshipId: id,
                applicationDate: todayDate,
                applicationStatus: "pending",
            };

            setIsSubmitted(true);
            await axiosPublic.post("/applied-scholarships", formDataExtra);

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

            Toast.fire({
                icon: "success",
                title: "Your scholarship application has been submitted successfully"
            });

            <Navigate to="/"></Navigate>
        } catch (error) {
            ToastError.fire({
                icon: "error",
                title: "There was an error while submitting your application. Please try again later"
            });
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

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

ScholarshipForm.propTypes = {
    universityName: PropTypes.string,
    scholarshipCategory: PropTypes.string,
    subjectCategory: PropTypes.string,
    applicationFees: PropTypes.number,
    serviceCharge: PropTypes.number,
};

export default ScholarshipForm;