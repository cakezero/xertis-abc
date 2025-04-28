import '../../styles/components/dashboard/main-navbar.scss';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import xertisLogo from '../../assets/xertis logo.svg';
import logout from '../../assets/dashboard/side-navbar/logout-icon.svg';
import overviewIcon from '../../assets/dashboard/side-navbar/overview-icon.svg';
import certificateIcon from '../../assets/dashboard/side-navbar/create-certificate-icon.svg';
import manageCertICon from '../../assets/dashboard/side-navbar/manage-certificate.svg';
import historyIcon from '../../assets/dashboard/side-navbar/history-icon.svg';
import settingsIcon from '../../assets/dashboard/side-navbar/settings-icon.svg';
function SidebarMobile({ isOpen, onClose }){
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = "hidden"; // Prevent background scroll
        } else {
          document.body.style.overflow = "auto"; // Restore scrolling
        }
    
        return () => {
          document.body.style.overflow = "auto"; // Cleanup when component unmounts
        };
      }, [isOpen]);
    return(
        <div class="offcanvas offcanvas-start sidebar-body d-lg-none" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
            <button type="button" class="btn-close hover-button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            <div className="sidebar-body-main">
                <div class="offcanvas-header">
                    <div className='nav-logo-div'>
                        <img src={xertisLogo} alt="" />
                        <a href="/" className="d-flex align-items-center text-white text-decoration-none">
                            xertis
                        </a>
                    </div>
                </div>
                <div class="offcanvas-body sidebar-body-main-content">
                <hr />
                    <ul className="nav nav-pills mb-auto flex-column side-navbar-ul">
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
                    <div className="nav-footer-logout justify-self-end">
                        <a href="#" className="nav-link">
                            Logout
                            <img src={logout} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SidebarMobile