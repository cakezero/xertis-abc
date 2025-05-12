import Sidebar from '../../components/Dashboard/Sidebar.jsx';
import '../../styles/pages/dashboard/overview.scss';
// import hamburger from '../../assets/dashboard/create-certificate/hamburger-menu.svg';
import Assets from '../../components/Dashboard/overview/Assets.jsx';
import Revenue from '../../components/Dashboard/overview/Revenue.jsx';
import RecentActivites from '../../components/Dashboard/overview/RecentActivities.jsx';
import SidebarMobile from '../../components/Dashboard/SidebarMobile.jsx';
import PageHeader from '../../components/Dashboard/PageHeader.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Overview(){
    window.addEventListener("beforeunload", function () {
        document.body.style.overflow = "auto"; // Reset overflow before navigating
    });
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/xertis/login");
            toast.error("Login to continue");
        }
    }, [navigate]);
    return(
        <div className='overview'>
            <Sidebar />
            <SidebarMobile />
            <div className='overview-body'>
                <section className='overview-title'>
                    {/* Moved the header to a seperate component called PageHeader */}
                    <PageHeader />
                </section>
                <Assets />
                {/* <Revenue /> */}
                <RecentActivites />
            </div>
        </div>
    )
}
export default Overview;
