import '../../styles/pages/Landing_Page/how-it-works.scss'
import { Link } from "react-router-dom";
import sketchDrawing from '../../assets/Landing_Page/how-it-works/man-with-drawing.svg';
function HowItWorks(){
    return(
        <div className="how-it-works">
            <div className='works-left-section'>
                <div>
                    <h2>
                        How it Works:Blockchain-Powered Certification in 3 Simple Steps
                    </h2>
                    <p>
                        From Creation to Verification: Your Certificates, Powered by Blockchain in 3 Simple Steps
                    </p>
                </div>
                <div>
                    <img src={sketchDrawing} alt="man drwaing" />
                </div>
            </div>

            <div className='works-right-section'>
                <div className='works-right-section-item'>
                    <div className='works-right-section-item-num'>
                        1
                    </div>
                    <div className='works-right-section-item-text'>
                        <h2>
                            Sign Up and connect your wallet
                        </h2>
                        <p>
                            Create your Xertis account in seconds and connect your blockchain wallet. This ensures your certificates are securely issued and managed on the blockchain.
                        </p>
                    </div>
                </div>

                <div className='works-right-section-item'>
                    <div className='works-right-section-item-num'>
                        2
                    </div>
                    <div className='works-right-section-item-text'>
                        <h2>
                            Create Your Certificate
                        </h2>
                        <p>
                            Customize your certificate with details like the recipient’s name, issuing organization, and logo. Set a mint price (optional) and generate a unique minting link
                        </p>
                    </div>
                </div>

                <div className='works-right-section-item'>
                    <div className='works-right-section-item-num'>
                        3
                    </div>
                    <div className='works-right-section-item-text'>
                        <h2>
                            Share and Verify
                        </h2>
                        <p>
                            Share the minting link with recipients. They can log in, claim their certificate, and verify its authenticity on the blockchain—anytime, anywhere.
                        </p>
                    </div>
                </div>

                <div className='works-right-section-button'>
                     <Link to="/signup" className='custom-link'>
                        <p>
                            Get Started
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default HowItWorks