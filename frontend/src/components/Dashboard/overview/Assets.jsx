import '../../../styles/components/dashboard/overview/assets.scss'
import walletIcon from '../../../assets/dashboard/overview/assets/wallet-icon.svg';
import minersIcon from '../../../assets/dashboard/overview/assets/total-miners-icon.svg';
import totalCertificates from '../../../assets/dashboard/overview/assets/total-certificate-icon.svg';
import bullArrow from '../../../assets/dashboard/overview/assets/bullish-arrow.svg';
import upArrow from '../../../assets/dashboard/overview/assets/green-up-arrow.svg';
import { useEffect, useState } from 'react';
import axios from "axios";
import { API } from '../../../constants/constants';
import { useUser } from '../../../provider/useUser';

function Assets() {
    const [balance, setBalance] = useState(0);
    const [minters, setMinters] = useState(0);
    const [certificates, setCertificates] = useState(0);

    const { globalUser } = useUser();
    const { email } = globalUser;

    useEffect(() => {
        (async () => {
            try { 
                const response = await axios.get(`${API}/creator/get-assets?email=${email}`);
                setBalance(response.data.responseProp.walletBalance);
                setMinters(response.data.responseProp.totalMinters);
                setCertificates(response.data.responseProp.certificates);
            } catch (error) {
                console.error(error.message);
            }
        })()
    })
    return(
        <section className='assets'>
            <div className='assets-wallet'>
                <img src={walletIcon} alt="a wallet icon" />
                <div className='assets-wallet-text'>
                    <div>
                        <p>Wallet Balance</p>
                        <h4>${balance}</h4>
                    </div>
                    <div className='align-self-end'>
                        <img src={bullArrow} alt="A bullish arrow" />
                    </div>
                </div>
                <div className='assets-wallet-analysis'>
                    <div className='assets-wallet-analysis-text'>
                        <img src={upArrow} alt="" />
                        <p>3.5%</p>
                    </div>
                    <div>
                        <p>from last week</p>
                    </div>
                </div>
            </div>


            <div className='assets-wallet'>
                <img src={totalCertificates} alt="a wallet icon" />
                <div className='assets-wallet-text'>
                    <div>
                        <p>Total Certificate Created</p>
                        <h4>{certificates}</h4>
                    </div>
                    <div className='align-self-end'>
                        <img src={bullArrow} alt="A bullish arrow" />
                    </div>
                </div>
                <div className='assets-wallet-analysis'>
                    <div className='assets-wallet-analysis-text'>
                        <img src={upArrow} alt="" />
                        <p>10.5%</p>
                    </div>
                    <div>
                        <p>from last week</p>
                    </div>
                </div>
            </div>


            <div className='assets-wallet'>
                <img src={minersIcon} alt="a wallet icon" />
                <div className='assets-wallet-text'>
                    <div>
                        <p>Total Minters</p>
                        <h4>{minters}</h4>
                    </div>
                    <div className='align-self-end'>
                        <img src={bullArrow} alt="A bullish arrow" />
                    </div>
                </div>
                <div className='assets-wallet-analysis'>
                    <div className='assets-wallet-analysis-text'>
                        <img src={upArrow} alt="" />
                        <p>3.5%</p>
                    </div>
                    <div>
                        <p>from last week</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Assets;