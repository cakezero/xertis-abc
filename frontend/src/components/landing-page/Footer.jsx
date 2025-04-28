import '../../styles/pages/landing-page/footer.scss';
import xertisLogo from '../../assets/landing-page/footer/xertis-logo.svg';
import facebook from '../../assets/landing-page/footer/facebook.svg';
import instagram from '../../assets/landing-page/footer/instagram.svg';
import linkedin from '../../assets/landing-page/footer/linkedin.svg';
import twitter from '../../assets/landing-page/footer/twitter.svg';
function Footer(){
    return(
        <footer>
            <div className='footer-main'>
                <div className='footer-content'>
                    <div className='footer-content-logo'>
                        <img src={xertisLogo} alt="xertis logo" />
                        <p>xertis</p>
                    </div>
                    <div className='footer-content-text'>
                        <p>
                            © 2025 Xertis. All rights reserved.
                        </p>
                    </div>
                </div>
                <div className='footer-content-links'>
                    <a href="#">
                        <img src={facebook} alt="facebook logo" />
                    </a>
                    <a href="#">
                        <img src={instagram} alt="instagram logo" />
                    </a>
                    <a href="#">
                        <img src={twitter} alt="twitter logo" />
                    </a>
                    <a href="#">
                        <img src={linkedin} alt="linkedin logo" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
export default Footer;