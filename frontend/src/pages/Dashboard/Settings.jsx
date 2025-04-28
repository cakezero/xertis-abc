import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import SidebarMobile from "../../components/Dashboard/SidebarMobile";
import PageHeader from "../../components/Dashboard/PageHeader";
import AccountSettings from "../../components/Dashboard/settings/pages/AccountSettings";
import PasswordSecurity from "../../components/Dashboard/settings/pages/PasswordSecurity";
import Notifications from "../../components/Dashboard/settings/pages/Notifications";
import '../../styles/pages/dashboard/settings.scss';
function Settings(){
    const [activeSection, setActiveSection] = useState("account"); // Default section
    return(
        <div className="settings">
            <Sidebar />
            <SidebarMobile />
            <div className="settings-body">
                <PageHeader />
                <div className="settings-title">
                    <div 
                    className={`page ${activeSection === "account" ? "active" : ""}`} 
                    onClick={() => setActiveSection("account")}
                    >
                        Account Settings
                    </div>
                    <div 
                    className={`page ${activeSection === "security" ? "active" : ""}`} 
                    onClick={() => setActiveSection("security")}
                    >
                        Password & Security
                    </div>
                    <div 
                    className={`page ${activeSection === "notifications" ? "active" : ""}`} 
                    onClick={() => setActiveSection("notifications")}
                    >
                        Notifications
                    </div>
                </div>

                <div className="settings-main">
                    {activeSection === 'account' && (<AccountSettings />)}
                    {activeSection === 'security' && (<PasswordSecurity />)}
                    {activeSection === 'notifications' && (<Notifications />)}
                </div>
            </div>
        </div>
    )
}

export default Settings;