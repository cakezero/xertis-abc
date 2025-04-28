import '../styles/login.scss'
import xertisLogo from '../assets/xertis-logo-colored.svg';
import AuthForm from '../components/landing-page/AuthForm';
import statsDashboard from '../assets/signin-login/stats-dashboard.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { API } from "../constants/constants"
import toast from "react-hot-toast"
import { useUser } from '../provider/useUser';
import { useState } from "react";

function Login() {
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();
    const { setGlobalUser } = useUser();
    const handleSubmit = async (formData) => {
        try {
            setSubmit(true);
            console.log("Login Data:", formData);

            const response = await axios.post(`${API}/creator/login`, { email: formData.email, password: formData.password });
            console.log({ response: response.data });

            localStorage.setItem("user", JSON.stringify(response.data.userInfo));
            setSubmit(false);
            navigate("/xertis/dashboard/overview");
            toast.success("Logged In successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.error);
            setSubmit(false);
        }
    }
    return(
        <div className="login login">
            <div className="login-left-section login-left-section">
                <a className="login-left-section-logo" href='/'>
                    <img src={xertisLogo} alt="xertis logo" />
                    <p>xertis</p>
                </a>
                <div className="login-left-section-form">
                    <div className='form-section'>
                        <div className='form-header'>
                            <h2>Log in</h2>
                            <p>Welcome back! Please enter your details</p>
                        </div>
                        <AuthForm isSignup={false} submit={submit} onSubmit={handleSubmit}/>
                    </div>
                    <div className='login-left-section-existing-account'>
                        <p>Don't have an account?
                            <Link to="/signup" className='custom-signup-link'>Sign up</Link>
                        </p>
                    </div>
                </div>
                <div className="login-left-section-footer-link">
                    <p>© Xertis 2025</p>
                </div>
            </div>
            <div className="login-right-section d-none d-md-flex">
                <div className='login-right-section-top'>
                    <h2>
                        Issue certificates that are secure, immutable, and verifiable on the blockchain. Say goodbye to fraud and hello to trust. 👋👋
                    </h2>
                </div>
                <div className='login-right-section-bottom'></div>
            </div>
        </div>    
    )
}
export default Login;