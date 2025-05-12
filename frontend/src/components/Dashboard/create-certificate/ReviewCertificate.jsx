import { useEffect, useState } from "react";
import "../../../styles/pages/dashboard/certificate-form.scss";
import { createCertificate } from "../../../certificate/cert";
import toast from "react-hot-toast";
import { Spinner } from "./Spinner";
import { useUser } from "../../../provider/useUser";
import axios from "axios";

// Imported icons
import awardIcon from "../../../assets/dashboard/create-certificate/steps/award-icon.svg";
import rightArrow from "../../../assets/right-arrow.svg";
import { symbols, API } from "../../../constants/constants";
import certificateImg from "../../../assets/dashboard/create-certificate/steps/form-certificate-placeholder.svg";

import descriptionImg from "../../../assets/dashboard/create-certificate/steps/form-description-placeholder.svg";

import dateImg from "../../../assets/dashboard/create-certificate/steps/form-date-placeholder.svg";

import mintImg from "../../../assets/dashboard/create-certificate/steps/new.png";

import numImg from "../../../assets/dashboard/create-certificate/steps/form-num-placeholder.svg";

// Certificate type options
const certificateTypes = [
  { id: "completion", label: "Completion", img: awardIcon },
  { id: "participation", label: "Participation", img: awardIcon },
  { id: "award", label: "Award", img: awardIcon },
  { id: "others", label: "Others", img: awardIcon },
];

const certificateFields = [
  {
    name: "certificateName",
    label: "Certificate Name",
    placeholder: "Enter certificate name",
    type: "text",
    img: certificateImg,
  },
  {
    name: "numberOfCertificate",
    label: "Number of Certificates",
    placeholder: "Enter number of certificates",
    type: "text",
    img: numImg,
  },
  {
    name: "certificateDescription",
    label: "Certification Description",
    placeholder: "Enter certificate description",
    type: "text",
    img: descriptionImg,
  },
  {
    name: "dateIssued",
    label: "Issue Date",
    type: "date",
    className: "form-control",
    img: dateImg,
  },
  {
    name: "mintPrice",
    label: "Mint Price",
    placeholder: "Enter mint price",
    type: "text",
    img: mintImg,
  },
];

const ReviewSubmit = ({
  formData,
  setFormData,
  prevStep,
  nextStep,
  globalUser,
}) => {
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  // const { globalUser, setLink } = useUser();
  const { email } = globalUser;
  // // State to track whether the user has connected a wallet and its set to true for now
  // const [walletConnected, setWalletConnected] = useState(false);

  // // Function to open the modal
  // const openModal = () => {
  //     setIsModalOpen(true);
  //     document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  // };

  // // Function to close the modal
  // const closeModal = () => {
  //     setIsModalOpen(false);
  //     document.body.style.overflow = "auto"; // Allow scrolling when modal is closed
  // };

  const handleSubmit = async () => {
    if (
      formData.certificateName === "" ||
      formData.numberOfCertificate === "" ||
      formData.dateIssued === "" ||
      formData.certificateDescription === "" ||
      formData.certificateType === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const symbol = symbols[formData.certificateType];

    try {
      setSubmit(true);
      const mintPrice = parseInt(formData.mintPrice);
      const { tx, certificateAddress } = await createCertificate(
        email,
        formData.certificateName,
        symbol,
        mintPrice
      );

      const createdResponse = await axios.post(
        `${API}/certificates/create-cert`,
        {
          certificateName: formData.certificateName,
          description: formData.certificateDescription,
          certificateAddress,
          owner: email,
          mintPrice,
          certificateType: formData.certificateType,
        }
      );
      // await axios.post(`${API}/creator/create-email`, { email, tx });
      localStorage.setItem("mintId", createdResponse.data.certId);

      setSubmit(false);
      nextStep();
    } catch (error) {
      toast.error("Failed to create certificate");
      console.error(error);
      setSubmit(false);
    }
  };

  // Function to handle selecting a certificate type
  const handleTypeSelect = (type) => {
    setFormData({ ...formData, certificateType: type });
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="certificate-form">
      {/* Header Section */}
      <div className="certificate-form-header">
        <p>Step 2</p>
        <h2>Review Certificate</h2>
      </div>

      {/* Form Content Section */}
      <div className="certificate-form-content">
        {/* Certificate Type Selection */}
        <div className="certificate-type-div">
          <h2 className="certificate-type-div-title">Certificate Type</h2>
          <div className="certificate-form-type">
            {certificateTypes.map(({ id, label, img }) => (
              <label
                key={id}
                className={`certificate-type ${
                  formData.certificateType === id ? "selected" : ""
                }`}
              >
                <img src={img} alt={label} className="certificate-img" />
                <h2>{label}</h2>
                <input
                  type="radio"
                  name="certificateType"
                  value={id}
                  checked={formData.certificateType === id}
                  onChange={() => handleTypeSelect(id)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Conditionally render others input */}
        {formData.certificateType === "others" && (
          <label className="certificate-input">
            Certificate type
            <input
              type="text"
              name="others"
              placeholder="Enter other title"
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

        {/* Navigation Buttons */}
        <div className="review-certificate-button">
          <button onClick={prevStep}>Back</button>
          <button type="button" onClick={handleSubmit}>
            {submit ? (
              <>
                <Spinner />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              <>
                Submit
                <img src={rightArrow} alt="right arrow" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
