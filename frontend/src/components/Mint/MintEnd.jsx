import CertificateAward from "../CertificateAward"
import '../../styles/components/mint/mint-pages.scss'
import shareIcon from '../../assets/certificate-award/share-icon.svg';
import downloadIcon from '../../assets/certificate-award/download-icon.svg';
function MintEnd({certificateType}){
    return(
        <div className="mint-body-pages mint-end-body">
            <div className="mint-title-pages mint-end-title">
                <h1>Congratulations!</h1>
                <p>
                    Your certificate has been minted successfully. Now you can download and share your certificate.
                </p>
            </div>
            <div className="mint-certificate-container">
                <CertificateAward type={certificateType} />
            </div>

            <div className="mint-share-buttons">
                <button className="advance share-btn">
                    Share
                    <img src={shareIcon} alt="a share icon image" />
                </button>
                <button className="advance">
                    Download
                    <img src={downloadIcon} alt="a download icon image" />
                </button>
            </div>
        </div>
    )
}
export default MintEnd;
