import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/signup-login.scss'
import xertisLogo from '../assets/xertis-logo-colored.svg';
import phoneImg from '../assets/signin-login/phone.svg';
import AuthForm from '../components/landing-page/AuthForm';
// import { useUser } from '../provider/useUser';
// import axios from "axios";
import toast from "react-hot-toast"
// import { API } from '../constants/constants';

function SignUp() {
    const [submit, setSubmit] = useState(false);
    // const { setGlobalUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
       try {
            setSubmit(true);
            console.log("Register Data:", formData);
           
            const response = await axios.post(`${API}/creator/register`, { name: formData.name, email: formData.email, password: formData.password });
            console.log({ response: response.data });
           
            setGlobalUser(response.data.userInfo);
            setSubmit(false);
            
            navigate("/xertis/dashboard/overview");
            toast.success("Logged In successfully");
        } catch (error) {
            console.error(error);
           toast.error("Error signing in");
           setSubmit(false);
        }
    }
    return(
        <div className="signup">
            <div className="signup-left-section">
                <a className="signup-left-section-logo" href='/'>
                    <img src={xertisLogo} alt="xertis logo" />
                    <p>xertis</p>
                </a>
                <div className="signup-left-section-form">
                    <div className='form-section'>
                        <div className='form-header'>
                            <h2>Sign In</h2>
                        </div>
                        <AuthForm isSignup={true} submit={submit} onSubmit={handleSubmit}/>
                    </div>
                    <div className='signup-left-section-existing-account'>
                        <p>Already have an account?
                            <Link to="/xertis/login" className='custom-login-link'>Log in</Link>
                        </p>
                    </div>
                </div>
                <div className="signup-left-section-footer-link">
                    <p>© Xertis 2025</p>
                </div>
            </div>
            <div className="signup-right-section d-none d-md-flex">
                <div className='signup-right-section-top'>
                    <h2>
                        Built on blockchain, Xertis guarantees trust, transparency, and authenticity—revolutionizing the way certificates are issued and verified.
                    </h2>
                </div>
                <div className='signup-right-section-bottom'></div>
            </div>
        </div>    
    )
}
export default SignUp;