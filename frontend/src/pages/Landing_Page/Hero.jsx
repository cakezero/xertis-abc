import '../../styles/pages/landing-page/hero.scss'
import { Link } from "react-router-dom";
import xertisLogo from '../../assets/xertis logo.svg';
import rightArrow from '../../assets/right-arrow.svg';
function Hero(){
    return(
        <div className="hero">
            <nav className='container-fluid'>
                <a className='right-section' href='/'>
                    <img src= {xertisLogo} alt='xertis logo'/>
                    <p>xertis</p>
                </a>
                <div className='left-section'>
                    <Link to ="/xertis/signup">Get Started</Link>
                </div>
            </nav>

            <section className='hero-intro container'>
                <div className='hero-title'>
                    <div>
                        <h1>Xertis</h1>
                        <Link to ="/signup" className='d-md-none custom-link'>
                            <p>
                                Get Started
                            </p>
                            <img src={rightArrow} alt="right arrow" className='right-arrow'/>
                        </Link>
                    </div>
                </div>
                <div className='hero-content'>
                    <div className='hero-content-text'>
                        <h2>Create and issue Digital Certificates on the Blockchain.</h2>
                        <p>
                            <i>Securely issue, manage and share verifiable certificates with Xertis</i>
                        </p>
                    </div>
                    <div className='hero-content-button'>
                        <Link to ='/signup' className='d-none custom-link d-md-flex'>
                            <p>
                                Get Started
                            </p>
                            <img src={rightArrow} alt="right arrow" className='right-arrow'/>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Hero;