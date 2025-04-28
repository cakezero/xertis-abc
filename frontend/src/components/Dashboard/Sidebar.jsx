import '../../styles/components/dashboard/main-navbar.scss';
import { NavLink } from "react-router-dom";
import xertisLogo from '../../assets/xertis logo.svg';
import logout from '../../assets/dashboard/side-navbar/logout-icon.svg';
import overviewIcon from '../../assets/dashboard/side-navbar/overview-icon.svg';
import certificateIcon from '../../assets/dashboard/side-navbar/create-certificate-icon.svg';
import manageCertICon from '../../assets/dashboard/side-navbar/manage-certificate.svg';
import historyIcon from '../../assets/dashboard/side-navbar/history-icon.svg';
import settingsIcon from '../../assets/dashboard/side-navbar/settings-icon.svg';
function Sidebar(){
    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 sidebar-navbar d-none d-md-flex" >
            <div className='nav-logo-div'>
                <img src={xertisLogo} alt="" />
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    xertis
                </a>
            </div>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto side-navbar-ul mt-4">
                <li className="nav-item">
                    <NavLink to="/xertis/dashboard/overview" 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <img src={overviewIcon} alt="overview icon" />
                        Overview
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/xertis/dashboard/certificate" 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <img src={certificateIcon} alt="overview icon" />
                        Create certificate
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/xertis/dashboard/manage-certificate" 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <img src={manageCertICon} alt="overview icon" />
                        Manage certificate
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/xertis/dashboard/history" 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <img src={historyIcon} alt="overview icon" />
                        History
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/xertis/dashboard/settings" 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                        <img src={settingsIcon} alt="overview icon" />
                        Settings
                    </NavLink>
                </li>
            </ul>
            <hr/>
            <div className="nav-footer-logout">
                <a href="#" className="nav-link">
                    Logout
                    <img src={logout} alt="" />
                </a>
            </div>
        </div>
    )
}
export default Sidebar;