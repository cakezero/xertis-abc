import { useState, useEffect } from 'react';
import appreciation from '../assets/dashboard/create-certificate/steps/generate-url/appreciation.svg';
import completion from '../assets/dashboard/create-certificate/steps/generate-url/completion.svg';
import participation from '../assets/dashboard/create-certificate/steps/generate-url/participation.svg';
import award from '../assets/dashboard/create-certificate/steps/generate-url/award.svg';
import others from '../assets/dashboard/create-certificate/steps/generate-url/completion.svg';
function CertificateAwardNew({formData}){
    const [certificateType, setCertificateType] = useState('completion');
    useEffect(() => {
        if (formData?.certificateType) {
            setCertificateType(formData.certificateType);
        } else {
            setCertificateType('completion');
        }
    }, [formData?.certificateType]); // Depend on formData.certificateType

    const certificateImages = {
        completion,
        participation,
        award,
        appreciation,
        others
    };

    return (
        <div className="certificate-type">
            <img src={certificateImages[certificateType]} alt={`${certificateType} certificate`} />
        </div>
    );
}

export default CertificateAwardNew;