import { Link } from 'react-router-dom';
import rightArrow from '../../assets/right-arrow.svg';
import '../../styles/pages/landing-page/about.scss';
function About(){
    return (
        <div className="about container-fluid px-3">
            <div className='left-section'>
                <h2>
                    Create Tamper-Proof Digital Certificates on the Blockchain with     
                    <span>
                        <i> Xertis.</i>
                    </span>
                </h2>
            </div>
            <div className='right-section'> 
                <p>
                Xertis empowers you to issue, manage, and share verifiable digital certificates with the security and transparency of blockchain technology.
                </p>
                <p>
                    Whether you're awarding course completions, recognizing achievements, or validating credentials, Xertis ensures your certificates are tamper-proof, immutable, and instantly verifiable.
                </p>
                <p>
                    Built on blockchain, Xertis guarantees trust, transparency, and authenticity—revolutionizing the way certificates are issued and verified. Join the future of certification today.
                </p>
                <Link to="/signup" className='custom-link'>
                    <p>
                        Get Started
                    </p>
                    <img src={rightArrow} alt="right arrow" className='right-arrow'/>
                </Link>
            </div>
        </div>
    );
}
export default About;