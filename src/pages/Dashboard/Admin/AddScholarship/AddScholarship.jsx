import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Title";
import ScholarshipFormInput from "../../../../components/ScholarshipFormInput";
import ScholarshipFormOptionInput from "../../../../components/ScholarshipFormOptionInput";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
    const initialState = {
        scholarshipName: "",
        universityName: "",
        universityLogo: "",
        universityCountry: "",
        universityCity: "",
        universityRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        scholarshipDescription: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            universityLogo: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const {
            universityName,
            universityLogo,
            universityCountry,
            universityCity,
            universityRank,
            subjectCategory,
            scholarshipCategory,
            scholarshipDescription,
            degree,
            tuitionFees,
            applicationFees,
            serviceCharge,
            applicationDeadline,
        } = formData;

        const todayDate = new Date().toISOString().split('T')[0];

        const scholarshipData = {
            university_name: universityName,
            university_logo: universityLogo,
            scholarship_category: scholarshipCategory,
            university_location: {
                country: universityCountry,
                city: universityCity
            },
            application_deadline: applicationDeadline,
            subject_name: subjectCategory,
            scholarship_description: scholarshipDescription,
            post_date: todayDate,
            stipend: parseInt(tuitionFees),
            university_rank: universityRank,
            service_charge: parseInt(serviceCharge),
            application_fees: parseInt(applicationFees),
            degree_name: degree,
            posted_user_email: user.email
        };

        if (universityLogo) {
            const formData = new FormData();
            formData.append('image', universityLogo);
            const res = await axiosPublic.post(image_hosting_api, formData);
            scholarshipData.university_logo = res.data.data.display_url;
        }

        const response = await axiosPublic.post("/scholarships", scholarshipData);

        if (response.status === 200) {
            setFormData(initialState);
            Swal.fire({
                title: "Success",
                text: "Scholarship added successfully!",
                icon: "success",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                iconColor: "var(--primary-500)",
                confirmButtonColor: "var(--primary-500)",
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Failed to add scholarship",
                icon: "error",
                background: "var(--accent-100)",
                color: "var(--text-primary)",
                confirmButtonColor: "var(--primary-500)",
            });
        }
        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Add Scholarship</title>
            </Helmet>

            <Title title="Add Scholarship" />

            {
                loading && <Loading />
            }

            <form onSubmit={ handleSubmit } className="grid grid-cols-1 md:grid-cols-2 gap-x-6 px-3 py-4">
                <ScholarshipFormInput
                    label="Scholarship Name"
                    value={ formData.scholarshipName }
                    onChange={ handleChange }
                    name="scholarshipName"
                    required
                />
                <ScholarshipFormInput
                    label="University Name"
                    value={ formData.universityName }
                    onChange={ handleChange }
                    name="universityName"
                    required
                />
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500">University Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={ handleImageUpload }
                        className="mt-1 block w-full border border-gray-500 rounded shadow focus:border-primary-500 focus:ring focus:ring-primary-500 p-1.5 bg-accent-100 text-sm"
                        required
                    />
                </div>
                <ScholarshipFormInput
                    label="University Country"
                    value={ formData.universityCountry }
                    onChange={ handleChange }
                    name="universityCountry"
                    required
                />
                <ScholarshipFormInput
                    label="University City"
                    value={ formData.universityCity }
                    onChange={ handleChange }
                    name="universityCity"
                    required
                />
                <ScholarshipFormInput
                    label="University World Rank"
                    value={ formData.universityRank }
                    onChange={ handleChange }
                    name="universityRank"
                    required
                />
                <ScholarshipFormOptionInput
                    label="Subject Category"
                    value={ formData.subjectCategory }
                    onChange={ handleChange }
                    options={ ["Agriculture", "Engineering", "Doctor"] }
                    name="subjectCategory"
                    required
                />
                <ScholarshipFormOptionInput
                    label="Scholarship Category"
                    value={ formData.scholarshipCategory }
                    onChange={ handleChange }
                    options={ ["Full Funding", "Partial Funding", "Self-funded"] }
                    name="scholarshipCategory"
                    required
                />
                <ScholarshipFormOptionInput
                    label="Degree"
                    value={ formData.degree }
                    onChange={ handleChange }
                    options={ ["Diploma", "Bachelor", "Masters"] }
                    name="degree"
                    required
                />
                <ScholarshipFormInput
                    label="Tuition Fees"
                    value={ formData.tuitionFees }
                    onChange={ handleChange }
                    name="tuitionFees"
                    type="number"
                    required
                />
                <ScholarshipFormInput
                    label="Application Fees"
                    value={ formData.applicationFees }
                    onChange={ handleChange }
                    name="applicationFees"
                    type="number"
                    required
                />
                <ScholarshipFormInput
                    label="Service Charge"
                    value={ formData.serviceCharge }
                    onChange={ handleChange }
                    name="serviceCharge"
                    type="number"
                    required
                />
                <ScholarshipFormInput
                    label="Application Deadline"
                    value={ formData.applicationDeadline }
                    onChange={ handleChange }
                    name="applicationDeadline"
                    type="date"
                    required
                />
                <ScholarshipFormInput
                    label="Scholarship Description"
                    value={ formData.scholarshipDescription }
                    onChange={ handleChange }
                    name="scholarshipDescription"
                    required
                />

                <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
                    Add Scholarship
                </button>
            </form>
        </>
    );
};

export default AddScholarship;