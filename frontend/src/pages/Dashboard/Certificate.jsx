import { useEffect, useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import EditCertificate from "../../components/Dashboard/create-certificate/EditCertificate.jsx";
import ReviewSubmit from "../../components/Dashboard/create-certificate/ReviewCertificate.jsx";
import GenerateURL from "../../components/Dashboard/create-certificate/GenerateCertificacte.jsx";
import '../../styles/pages/dashboard/certificate.scss';
import '../../styles/components/dashboard/main-navbar.scss';
import SidebarMobile from "../../components/Dashboard/SidebarMobile.jsx";
import PageHeader from "../../components/Dashboard/PageHeader.jsx";
import toast from "react-hot-toast";

// Imported images/icons used in the UI creation
import editCert from '../../assets/dashboard/create-certificate/steps/edit-cert-icon.svg';
import generateCert from '../../assets/dashboard/create-certificate/steps/generate-cert-icon.svg';
import reviewCert from '../../assets/dashboard/create-certificate/steps/review-cert-icon.svg';
import { useNavigate } from "react-router-dom";

function Certificate() {
    // Initialized state to manage the current step in the certificate creation process
    const [step, setStep] = useState(1);
    const [globalUser, setGlobalUser] = useState({});
    const navigate = useNavigate();


    // State to store form data for the certificate
    const [formData, setFormData] = useState({
      certificateName: "",       // Name of the certificate
      certificateType: "completion", // Default type of certificate
      certificateDescription: "",  // Description of the certificate
      mintPrice: "0",              // Mint price 
      dateIssued: "",             // Date when the certificate is issued
      awardTitle: "",             // Award title (if applicable)
      customType: "",             // Custom certificate type (if applicable)
      numberOfCertificate: ""      // Number of certificates to be generated
    });

    useEffect(() => {
        (async () => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("/xertis/login");
            toast.error("You need to be logged in to access this route")
            return;
        }

        const userObject = JSON.parse(user);

        setGlobalUser(userObject);
        })();
    });

    // Function to navigate to the next step
    const nextStep = () => setStep(step + 1);

    // Function to navigate to the previous step
    const prevStep = () => setStep(step - 1);

    return (
      <div className="certificate">
        {/* Main navigation bar */}
        <Sidebar />
        <SidebarMobile />
        <div className="certificate-body">
          {/* Header section with title and wallet connection button */}
          <section className="certificate-title">
            {/* Moved the header to a seperate component called PageHeader */}
            <PageHeader />
          </section>

          {/* Main content area */}
          <section className="certificate-main-content">
            {/* Header displaying steps */}
            <div className="certificate-main-content-header">
              <div className="certificate-main-content-title">
                <h1>Create Certificate</h1>
                <p>Create a new certificate here for school</p>
              </div>

              {/* Steps indicator */}
              <div className="certificate-main-content-steps">
                <div className="steps-indicator">
                  <div
                    className={`steps  ${step >= 1 ? "completed" : ""}`}
                    data-step="1"
                  >
                    <img src={editCert} alt="edit certification icon" />
                    Edit Certificate
                  </div>
                  <div
                    className={`steps ${step >= 2 ? "completed" : ""}`}
                    data-step="1"
                  >
                    <img src={reviewCert} alt="review certification icon" />
                    Review & Submit
                  </div>
                  <div
                    className={`steps ${step >= 3 ? "completed" : ""}`}
                    data-step="1"
                  >
                    <img src={generateCert} alt="generate certification icon" />
                    Generate URL
                  </div>
                </div>
              </div>
            </div>

            {/* Step-based content rendering */}
            {step === 1 && (
              <EditCertificate
                formData={formData}
                setFormData={setFormData}
                nextStep={nextStep}
              />
            )}
            {step === 2 && (
              <ReviewSubmit
                formData={formData}
                setFormData={setFormData}
                prevStep={prevStep}
                nextStep={nextStep}
                globalUser={globalUser}
              />
            )}
            {step === 3 && (
              <GenerateURL formData={formData} prevStep={prevStep} />
            )}
          </section>
        </div>
      </div>
    );
}

export default Certificate;
