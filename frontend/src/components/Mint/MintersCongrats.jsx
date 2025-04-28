import '../../styles/components/mint/mint-pages.scss';
import { useState } from "react";
import { Spinner } from "../Dashboard/create-certificate/Spinner";
import { mintCertificate } from '../../certificate/cert';
import { API } from '../../constants/constants';
import axios from "axios";

function MintersCongrats({ nextStep, certificate, mintData, certId }) {
    const [submit, setSubmit] = useState(false);
    const { certificateName, certificateType, certificateAddress, description, mintPrice, owner } = certificate;

    const mint = async () => {
        try {
            setSubmit(true);
            console.log(certificateAddress)

            const hash = await mintCertificate(certificateAddress, mintData.mintersName, certificateName, description, certificateType, mintPrice, certId, owner);
            await axios.post(`${API}/certificates/mint-cert`, {
              email: mintData.mintersEmail,
              hash,
              certId,
              name: mintData.mintersName,
              amount: mintPrice,
            });
            
            setSubmit(false);
            nextStep();
        } catch (error) {
            console.error(error);
            setSubmit(false);
        }
    }
    return(
        <div className="mint-body-pages">
            <div className="mint-title-pages">
                <h1>Congratulations!</h1>
                <p>
                    Your certificate ({certificateName}) is ready for Mint. Click the mint button below to proceed.
                </p>
            </div>
            <button onClick={mint} className='advance'>
                {submit ? (
                    <>
                        <Spinner />
                        <span className="ml-2">Minting...</span>
                    </>
                ) : "Mint now"}
            </button>
        </div>
    )
}
export default MintersCongrats
