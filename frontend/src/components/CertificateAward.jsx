import '../styles/components/certificate-award.scss';
import awardRibbon from '../assets/award-ribbon.svg';
import designLeft from '../assets/certificate-award/floating-asset-left.svg';
import designRight from '../assets/certificate-award/floating-asset-right.svg';
import qrCode from '../assets/certificate-award/qr-code.svg';
function CertificateAward({certificateType, date}){
    return(
        <div className="certificate-award">
            <div className='certificate-award-title'>
                <h1>CERTIFICATE
                    <br />
                    <span>OF {certificateType ? certificateType : 'APPRECIATION'}</span>
                </h1>
                
            </div>
            <div className='certificate-award-name'>
                <h1>This Certificate NFT is proudly presented to the holder for their exceptional work</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus nulla tellus, vitae vitae amet fusce. Nam nec aliquet nunc vitae eget mattis. Sem nec ut nisi, et malesuada sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>
            <div className='certificate-award-img'>
                <img src={awardRibbon} alt="an award ribbon image" />
                <div className='certificate-award-img-date'>
                    <div className='date-placeholder'>
                        {date}
                    </div>
                    Date
                </div>
            </div>
            <img src={designLeft} alt="a design asset" className='design-left'/>
            <img src={designRight} alt="a design asset" className='design-right'/>
            <img src={qrCode} alt="a qr code image" className='qr-code-img'/>
        </div>
    )
}
export default CertificateAward
