import '../../../styles/components/dashboard/overview/recent-activites.scss';
import recentIcon from '../../../assets/dashboard/overview/recent-activites/recent-icon.svg'
import refreshIcon from '../../../assets/dashboard/overview/recent-activites/refresh-icon.svg';
import certificateIcon from '../../../assets/dashboard/overview/recent-activites/certificate-icon.svg';
import timerICon from '../../../assets/dashboard/overview/recent-activites/clock-icon.svg';
import { useEffect, useState } from 'react';
import { useUser } from "../../../provider/useUser";
import { API } from "../../../constants/constants";
import axios from "axios";

const mintedCertificates = [];

function RecentActivites() {

    const [item, setItem] = useState(false);
    useEffect(() => {
        (async () => {
            const user = localStorage.getItem("user");
            const parsedObj = JSON.parse(user);
            const response = await axios.get(`${API}/creator/history?email=${parsedObj.email}`);
            const info = response.data.historyInfo;
            if (info === "") {
                setItem(false);
            } else {
                for (let i = 0; i < 3; i++) {
                    mintedCertificates.push(info[i]);
                }
                setItem(true);
            }
        })();
    }, []);
    return(
        <section className="activities">
            <div className='activities-header'>
                <div className='activities-header-text'>
                    <img src={recentIcon} alt="a piggy bank icon" loading='lazy' className='recent-img'/>
                    <p>Recent activities</p>
                </div>
                <div className='activities-header-button'>
                    <img src={refreshIcon} alt="a right arrow icon" className='refresh-img'/>
                </div>
            </div>

            <div className='recent-activities'>
                {item ? mintedCertificates.map((mint) => (
                    <div className='recent-activities-item'>
                        <div className='item-text'>
                            <img src={certificateIcon} alt="certificate icon" />
                            <p>Congratulations! Certificate {mint.certName} was minted by {mint.name}</p>
                        </div>
                        <div className='item-timer'>
                            <img src={timerICon} alt="timer icon" />
                            <span>40mins ago</span>
                        </div>
                    </div>
                )) : <div className='recent-activities-item'>No recent activity</div> }
            </div>
        </section>
    )
}
export default RecentActivites