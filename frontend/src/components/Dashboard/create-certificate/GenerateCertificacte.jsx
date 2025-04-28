import '../../../styles/pages/dashboard/certificate-form.scss';
import certificateImg from '../../../assets/dashboard/create-certificate/steps/generate-url/certificate-image.svg';
import { useEffect } from 'react';
import ShareCertificate from './ShareCertificate.jsx';
import CertificateAwardNew from '../../CertificateAwardNew.jsx';

const GenerateURL = ({ formData, prevStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component loads
  }, []);
  return (
    <div className="certificate-form">
        <div className="certificate-form-header">
            <p>step 3</p>
            <h2>Generate certificate url</h2>
        </div>
        
        <div className="generate-url-content">
          <h2 className='generate-certificate-title'>Congratulations! Your certificate has been created successfully!</h2>
          <div className="generated-certificate">
            <div className="certificate-img">
              <CertificateAwardNew formData={formData} />
            </div>

            <ShareCertificate />
          </div>
          {/* <button onClick={prevStep}>Back</button> */}
        </div>
    </div>
  );
};

export default GenerateURL;
