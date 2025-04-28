import '../styles/pages/mint.scss';
import { useEffect, useState } from 'react';
import MintIntro from '../components/Mint/MintIntro.jsx';
import xertisLogo from '../assets/xertis logo.svg';
import MintersEmail from '../components/Mint/MintersEmail.jsx';
import MintersName from '../components/Mint/MintersName.jsx';
import MintersCongrats from '../components/Mint/MintersCongrats.jsx';
import MintModal from '../components/Mint/MIntModal.jsx';
import MintEnd from '../components/Mint/MintEnd.jsx';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API } from '../constants/constants';
function Mint(){

    const { certId } = useParams();
    
    const [mintData, setMintData] = useState({
        mintersEmail: '', //The users email address
        mintersName: ''.toUpperCase()//The users full name
    });
    const [certificate, setCertInfo] = useState({});

    useEffect(() => {
        (async () => {
            const response = await axios.get(`${API}/certificates/${certId}`);
            setCertInfo(response.data.certificateInfo);
        })();
    }, [setCertInfo, certId]);

    const [step, setStep] = useState(1);
     // Function to navigate to the next step
     const nextStep = () => setStep(step + 1);

     // Function to navigate to the previous step
     const prevStep = () => setStep(step - 1);
    return(
        <div className="mint-body">
            <div className='xertis-logo'>
                <a href="/">
                    <img src={xertisLogo} alt="xertis logo" />
                    Xertis
                </a>
            </div>
            {step === 1 && (
                <MintIntro nextStep={nextStep} />
            )}

            {step === 2 && (
                <MintersEmail nextStep={nextStep} mintData={mintData} setMintData={setMintData} />
            )}

            {step === 3 && (
                <MintersName nextStep={nextStep} mintData={mintData} setMintData={setMintData} />
            )}

            {step === 4 && (
                <MintModal nextStep={nextStep} />
            )}

            {step === 5 && (
                <MintersCongrats nextStep={nextStep} certificate={certificate} mintData={mintData} certId={certId} />
            )}

            {step === 6 && (
                <MintEnd mintData={mintData} certificateType={certificate.certificateType} />
            )}
        </div>
    )
}

export default Mint
