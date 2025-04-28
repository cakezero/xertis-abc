import Sidebar from "../../components/Dashboard/Sidebar.jsx";
import SidebarMobile from "../../components/Dashboard/SidebarMobile.jsx";
import MintHistory from "../../components/Dashboard/manage-cert/MintHistory.jsx";
import '../../styles/pages/dashboard/manage-cert.scss';
import PageHeader from "../../components/Dashboard/PageHeader.jsx";
import checkbox from '../../assets/dashboard/manage-cert/Checkbox.svg';
import mailIcon from '../../assets/dashboard/manage-cert/mail-icon.svg';
import phoneIcon from '../../assets/dashboard/manage-cert/phone-icon.svg';

//Imported Icons

function ManageCertificate(){
    return(
        <div className="manage-cert">
            <Sidebar />
            <SidebarMobile />
            <section className="manage-cert-body">
                <div className='manage-cert-title'>
                    {/* Moved the header to a seperate component called PageHeader */}
                    <PageHeader />
                </div>

                <div className="manage-cert-history">
                    <div className="manage-cert-history-header">
                        <div>
                            <img src={checkbox} alt="a checkbox image" className="d-none d-lg-block"/>
                            Certificate name
                        </div>
                        <div>
                            <img src={mailIcon} alt="a mail image" className="d-none d-lg-block"/>
                            No of minters
                        </div>
                        <div>
                            <img src={phoneIcon} alt="a phone image" className="d-none d-lg-block"/>
                            Mint URL
                        </div>
                    </div>
                    <MintHistory />
                </div>
            </section>
        </div>
    )
}

export default ManageCertificate