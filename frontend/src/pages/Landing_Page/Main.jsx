import About from "../../components/Landing_page/About";
import { Link } from "react-router-dom";
import HowItWorks from "../../components/Landing_page/HowItWorks";
import Footer from "../../components/Landing_page/Footer";
import '../../styles/pages/Landing_Page/main.scss';
import manTurnLeft from '../../assets/Landing_Page/services-image/man turning left.jpeg';
import rightArrow from '../../assets/Landing_Page/services-image/right-long-arrow.svg';
import rightSmallArrow from '../../assets/right-arrow.svg';
import cube from '../../assets/Landing_Page/services-image/cube.svg';
import easyUse from '../../assets/Landing_Page/services-image/easy-to-use.svg';
import customizable from '../../assets/Landing_Page/services-image/customize.svg';
import instantVerification from '../../assets/Landing_Page/services-image/shield-check.svg';
function Main(){
    return (
        <div className="main">
            <About />
            <section className='container-fluid px-3 services'>
                <div className="services-main">
                    <div className="services-left-section">
                        <div className="services-title">
                            <h2>
                                <span className="services-title-span-1">Why </span>
                                Choose <span className="services-title-span-2">Xertis?</span>
                            </h2>
                        </div>

                        <div className="services-content">
                            <div className="services-content-item">
                                <img src={rightArrow} alt="right_arrow" />
                                <div className="services-content-item-text">
                                    <div className="services-content-item-text-title">
                                        <img src={cube} alt="a cube"/>
                                        <p>On-chain certificates</p>
                                    </div>
                                    <p>
                                        Issue certificates that are secure, immutable, and verifiable on the blockchain in seconds. Say goodbye to fraud and hello to trust.
                                    </p>
                                </div>
                            </div>

                            <div className="services-content-item">
                                <img src={rightArrow} alt="right_arrow" />
                                <div className="services-content-item-text">
                                    <div className="services-content-item-text-title">
                                        <img src={easyUse} alt="hand snap"/>
                                        <p>Easy to use</p>
                                    </div>
                                    <p>
                                        Create and manage certificates effortlessly with our intuitive dashboard. No technical expertise required—just simplicity and speed.
                                    </p>
                                </div>
                            </div>

                            <div className="services-content-item">
                                <img src={rightArrow} alt="right_arrow" />
                                <div className="services-content-item-text">
                                    <div className="services-content-item-text-title">
                                        <img src={customizable} alt="customize image"/>
                                        <p>Customizable</p>
                                    </div>
                                    <p>
                                        Personalize your certificates with your logo, issuer name, and unique details. Make every certificate a reflection of your brand.
                                    </p>
                                </div>
                            </div>

                            <div className="services-content-item">
                                <img src={rightArrow} alt="right_arrow" />
                                <div className="services-content-item-text">
                                    <div className="services-content-item-text-title">
                                        <img src={instantVerification} alt="a cube"/>
                                        <p>Instant verification</p>
                                    </div>
                                    <p>
                                        Recipients can verify their certificates in seconds using blockchain technology. Transparency and trust, built into every certificate.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="services-content-bottom">
                            <p>
                                <span className="services-span-1">Securing Credentials</span> with <span className="services-span-2">Blockchain.</span>
                            </p>
                        </div>
                    </div>

                    <div className="services-right-section">
                        <img src={manTurnLeft} alt="a man" />
                    </div>
                </div>

                <div className="get-started">
                    <div className="left-section">
                        <Link to="/signup" className="custom-link">
                            <p>
                                Get Started
                            </p>
                            <img src={rightSmallArrow} alt="right arrow" className='right-arrow'/>
                        </Link>
                    </div>
                    <div className="right-section">
                        <h2>
                            <span>Xertis: Where Trust Meets Technology—</span>Certificates, Reimagined with Blockchain.
                        </h2>
                    </div>
                </div>
            </section>

            <HowItWorks />

            <section className="start-now">
                <div className="start-now-intro">
                    <h2>
                        Start Issuing Blockchain-Powered Certificates Today
                    </h2>
                    <p>
                        Join Xertis today and start issuing secure, blockchain-powered certificates in minutes. Experience the future of certification—where trust, transparency, and technology come together.
                    </p>
                </div>
                <div className="start-now-button">
                    <Link to = "/signup" className="custom-link">
                        <p>
                            Get Started now
                        </p>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
export default Main;