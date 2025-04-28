import piggyBank from '../../../assets/dashboard/overview/revenue/piggy-bank.svg';
import upArrow from '../../../assets/dashboard/overview/revenue/green-up-arrow.svg';
import rightArrow from '../../../assets/right-arrow.svg';
import '../../../styles/components/dashboard/overview/revenue.scss';
import purpleDot from '../../../assets/dashboard/overview/revenue/purple-dot-icon.svg';
import aquaDot from '../../../assets/dashboard/overview/revenue/aqua-dot-icon.svg';
import revenueChart from '../../../assets/dashboard/overview/revenue/revenue-chart-image.svg';
import revenueMobileChart from '../../../assets/dashboard/overview/revenue/revenue-mobile-chart-image.svg';
import { useEffect, useState } from 'react';
import { useUser } from "../../../provider/useUser"
import { Card, AreaChart, Title } from "@tremor/react";
import { API } from "../../../constants/constants";
import axios from "axios";
import { withdrawProfits } from "../../../certificate/cert"
import OverviewModal from './OverviewModal';

function Revenue() {
    const { globalUser } = useUser();
    const { email } = globalUser;
    const [revenue, setRevenue] = useState([{
        Minters: 0,
        amount: 0,
        Month: "Jan"
    }]);
    const [totalRevenue, setTotalRevenue] = useState(0)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API}/certificate/get-revenue?email=${email}`)
                const creatorResponse = await axios.get(`${API}/creator/get-revenue?email=${email}`)
                console.log({ response: response.data.revenueInfo, creatorResponse: creatorResponse.data.revenue })
                setRevenue(response.data.revenueInfo)
                setTotalRevenue(creatorResponse.data.revenue)
            } catch (error) {
                console.error(error)
            }
        })()
    })

    // State to manage the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    };
       // Function to close the modal
       const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // Allow scrolling when modal is closed
    };
    return(
        <section className='revenue'>
            {/*This line trigger the overview modal to open */}
            {isModalOpen && <OverviewModal closeModal={closeModal} />}
            <div className='revenue-header'>
                <div className='revenue-header-text'>
                    <img src={piggyBank} alt="a piggy bank icon" loading='lazy'/>
                    <p>Revenue</p>
                </div>
                <div className='revenue-header-button'>
                    <button onClick={openModal}>
                        Withdraw
                        <img src={rightArrow} alt="a right arrow icon" />
                    </button>
                </div>
            </div>
            <Card>
                <Title>$ {totalRevenue}</Title>
                <AreaChart 
                    data={revenue}
                    categories={["Minters", "amount"]}
                    index="Month"
                    colors={["indigo", "fuchsia"]}
                    valueFormatter={(number) =>
                        `$ ${Intl.NumberFormat("us").format(number).toString()}`
                    }
                    yAxisWidth={60}
                />
            </Card>
        </section>
    )
}
export default Revenue;