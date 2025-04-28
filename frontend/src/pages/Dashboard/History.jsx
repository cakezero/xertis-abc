import '../../styles/pages/dashboard/history.scss';
import Sidebar from '../../components/Dashboard/Sidebar.jsx';
import SidebarMobile from '../../components/Dashboard/SidebarMobile.jsx';
import { useState, useEffect } from 'react';
import { API } from '../../constants/constants';
import axios from "axios"
import { useUser } from '../../provider/useUser';
import PageHeader from '../../components/Dashboard/PageHeader.jsx';

//Imported icons
import certificateIcon from '../../assets/dashboard/overview/recent-activites/certificate-icon.svg';
import timerICon from '../../assets/dashboard/overview/recent-activites/clock-icon.svg';
import recentIcon from '../../assets/dashboard/overview/recent-activites/recent-icon.svg'
import refreshIcon from '../../assets/dashboard/overview/recent-activites/refresh-icon.svg';

// const historyActivity = [
//     {
//         minter: 'John Doe',
//         certificateType: 'XYZ'
//     },
//     {
//         minter: 'Bright Senpai',
//         certificateType: 'ABC'
//     },
//     {
//         minter: 'Uthman Cage',
//         certificateType: 'YKN'
//     }
// ]

//A randomized for loop to create mutiple certificates
let historyItem = [];
// for(let i = 0; i < 15; i++){
//     const randomHistory = Math.floor(Math.random() * historyActivity.length);
//     const randomHistoryItem = historyActivity[randomHistory];
//     historyItem.push(randomHistoryItem);
// }
console.log(historyItem)
function History() {
  const { globalUser } = useUser();
  const { email } = globalUser;
  const [item, setItem] = useState(false)
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API}/creator/history?email=${email}`);
      const info = response.data.historyInfo;
      console.log({ historyResponse: info });
      if (info === ""){
          setItem(false)
      } else {
        historyItem.push(...info);
        setItem(true)
      }
    })()
  })
    return (
      <section className="history">
        <Sidebar />
        <SidebarMobile />
        <div className="history-body">
          <div className="history-title">
            {/* Moved the header to a seperate component called PageHeader */}
            <PageHeader/>
          </div>

          <div className="history-activity">
            <div className="history-header">
              <div className="history-header-text">
                <img
                  src={recentIcon}
                  alt="a piggy bank icon"
                  loading="lazy"
                  className="recent-img"
                />
                <p>Recent history</p>
              </div>
              <div className="history-header-button">
                <img
                  src={refreshIcon}
                  alt="a right arrow icon"
                  className="refresh-img"
                />
              </div>
            </div>
            <div className="history-activity-item">
              {item ? (
                historyItem.map((history) => (
                  <div className="history-activity-item-div">
                    <div className="item-text">
                      <img src={certificateIcon} alt="certificate icon" />
                      <p>
                        Congratulations! Certificate {history.certName} was
                        minted by {history.name}
                      </p>
                    </div>
                    <div className="item-timer">
                      <img src={timerICon} alt="timer icon" />
                      <span>40mins ago</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="history-activity-item-div">
                  <p>No History available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
}

export default History