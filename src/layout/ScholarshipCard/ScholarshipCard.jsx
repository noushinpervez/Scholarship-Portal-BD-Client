import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
    const { _id, university_name, university_logo, scholarship_category, university_location, application_deadline, subject_name, application_fees } = scholarship;

    return (
        <div className="w-full max-w-4xl flex flex-row gap-1 sm:items-center justify-between px-5 py-4 rounded border-b-4 border-accent-400 bg-gradient-to-tl from-accent-50 to-accent-200">
            <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
            <div>
                {/* University name */ }
                <span className="text-primary-700 text-sm">{ university_name }</span>

                {/* Subject name */ }
                <h3 className="font-bold mt-px">{ subject_name }</h3>

                <div className="flex items-center gap-3 mt-3">
                    {/* Application deadline */ }
                    <span className="text-slate-600 text-sm flex gap-1">
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"
                        ><path strokeLinecap="round" strokeLinejoin="round" d="M23.14 24 9 32.24A16.37 16.37 0 1 0 23.14 7.64Z" /><path d="M24 45.5A21.5 21.5 0 1 1 45.5 24 21.51 21.51 0 0 1 24 45.5Z" />
                        </svg>{ application_deadline }
                    </span>

                    {/* Application fees */ }
                    <span className="text-slate-600 text-sm flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3,11c0-0.552,0.448-1,1-1s1,0.448,1,1c0,0.552-0.448,1-1,1S3,11.552,3,11z M4,22c0.552,0,1-0.448,1-1
                            c0-0.552-0.448-1-1-1s-1,0.448-1,1C3,21.552,3.448,22,4,22z M28,10c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1s1-0.448,1-1
                            C29,10.448,28.552,10,28,10z M21,16c0,3.314-1.686,6-5,6s-5-2.686-5-6s1.686-6,5-6S21,12.686,21,16z M20,16c0-2.417-1.051-5-4-5
                            s-4,2.583-4,5c0,2.417,1.051,5,4,5S20,18.417,20,16z M28,20c-0.552,0-1,0.448-1,1c0,0.552,0.448,1,1,1s1-0.448,1-1
                            C29,20.448,28.552,20,28,20z M31,12.28V22c0,1.105-0.895,2-2,2h-9.686l-6.849,6.849c-0.391,0.391-0.902,0.586-1.414,0.586
                            s-1.024-0.195-1.414-0.586l-6.873-6.873c-0.923-0.11-1.647-0.844-1.742-1.771C0.432,21.481,0.425,20.451,1,19.72V10
                            c0-1.105,0.895-2,2-2h9.686l6.849-6.849c0.391-0.391,0.902-0.586,1.414-0.586s1.024,0.195,1.414,0.586l6.873,6.873
                            c0.923,0.11,1.647,0.843,1.742,1.771C31.568,10.519,31.575,11.549,31,12.28z M14.101,8h13.698l-6.142-6.142
                            c-0.189-0.189-0.44-0.293-0.707-0.293s-0.518,0.104-0.707,0.293L14.101,8z M17.899,24H4.201l6.142,6.142
                            c0.189,0.189,0.44,0.293,0.707,0.293c0.267,0,0.518-0.104,0.707-0.293L17.899,24z M30,10c0-0.551-0.449-1-1-1H3
                            c-0.551,0-1,0.449-1,1v12c0,0.551,0.449,1,1,1h26c0.551,0,1-0.449,1-1V10z"/>
                        </svg>{ application_fees } BDT
                    </span>
                </div>

                <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {/* Scholarship category */ }
                    <span className="bg-accent-100 text-primary-800 rounded-full px-3 py-1 text-sm whitespace-nowrap">{ scholarship_category }</span>

                    {/* University location */ }
                    <span className="text-slate-600 text-sm flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        { university_location.country }
                    </span>
                </div>

                {/* Scholarship details */ }
                <Link to={ `/scholarships/${_id}` }>
                    <button className="mt-5 bg-primary-800 text-text-50 font-medium px-4 py-2 rounded flex gap-1 items-center">
                        Scholarship Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </Link>
            </div>

            {/* University logo */ }
            <div className="h-full">
                <img className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-center object-cover" src={ university_logo } alt={ `${university_name} logo` } />
            </div>
        </div>
    );
};

ScholarshipCard.propTypes = {
    scholarship: PropTypes.object,
};

export default ScholarshipCard;