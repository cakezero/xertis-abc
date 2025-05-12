import React, { useState, useEffect } from "react";
import '../../../styles/pages/dashboard/certificate-form.scss';

//imported icons

import certificateImg from '../../../assets/dashboard/create-certificate/steps/form-certificate-placeholder.svg';

import descriptionImg from '../../../assets/dashboard/create-certificate/steps/form-description-placeholder.svg';

import dateImg from '../../../assets/dashboard/create-certificate/steps/form-date-placeholder.svg';

import mintImg from '../../../assets/dashboard/create-certificate/steps/new.png';

import numImg from '../../../assets/dashboard/create-certificate/steps/form-num-placeholder.svg';

import awardIcon from '../../../assets/dashboard/create-certificate/steps/award-icon.svg'
import rightArrow from '../../../assets/right-arrow.svg';

// This block of code defines the different types of certificates available
const certificateTypes = [
    { id: "completion", label: "Completion", img: awardIcon },
    { id: "participation", label: "Participation", img: awardIcon },
    { id: "award", label: "Award", img: awardIcon },
    { id: "others", label: "Others", img: awardIcon }
];

const certificateFields = [
    { name: "certificateName", label: "Certificate Name", placeholder: "Enter certificate name", type: "text", img: certificateImg },
    { name: "numberOfCertificate", label: "Number of Certificates", placeholder: "Enter number of certificates", type: "text", img: numImg },
    { name: "certificateDescription", label: "Certification Description", placeholder: "Enter certificate description", type: "text", img: descriptionImg },
    { name: "dateIssued", label: "Issue Date", type: "date", className: "form-control", img: dateImg },
    { name: "mintPrice", label: "Mint Price", placeholder: "Enter mint price", type: "text", img: mintImg },
  ];

const EditCertificate = ({ formData, setFormData, nextStep }) => {
    // State to track the selected certificate type
    const [selectedType, setSelectedType] = useState(formData.certificateType);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when the component loads
      }, []);

    // Handles changes in input fields and updates the form data state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handles certificate type selection and updates the form data accordingly
    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setFormData({ ...formData, certificateType: type });
    };

    return (
        <section className="certificate-form">
            {/* Header section for the edit certificate step */}
            <div className="certificate-form-header">
                <p>Step 1</p>
                <h2>Edit Certificate</h2>
            </div>

            <div className="certificate-form-content">
                {/* Certificate type selection section */}
                <div className="certificate-type-div">
                    <h2 className="certificate-type-div-title">Certificate Type</h2>
                    <div className="certificate-form-type">
                        {/* Rendering different certificate types as options */}
                        {certificateTypes.map(({ id, label, img }) => (
                            <label key={id} className={`certificate-type ${selectedType === id ? "selected" : ""}`}>
                                <img src={img} alt={label} className="certificate-img" />
                                <h2>{label}</h2>
                                <input
                                    type="radio"
                                    name="certificateType"
                                    value={id}
                                    checked={selectedType === id}
                                    onChange={() => handleTypeSelect(id)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Conditionally render custom input for "Others" */}
                {selectedType === "others" && (
                <label className="certificate-input">
                    Certificate Type
                    <input
                        type="text"
                        name="customType"
                        placeholder="Enter custom certificate type"
                        value={formData.customType}
                        onChange={handleChange}
                    />
                    <img src={certificateImg} alt="A certificate image placeholder" />
                </label>
                )}

                {/* Map through certificate fields and render input dynamically */}
                {certificateFields.map((field) => (
                <label key={field.name} className="certificate-input">
                {field.label}
                <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={field.className || ""}
                />
                <img src={field.img} alt={`${field.name} image`} />
                </label>
                ))}
                
                {/* Button to proceed to the next step */}
                <button onClick={nextStep}>
                    Next
                    <img src={rightArrow} alt="Right arrow icon" />
                </button>
            </div>
        </section>
    );
};

export default EditCertificate;
