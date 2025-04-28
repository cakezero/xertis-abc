import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import hamburger from '../../assets/dashboard/hamburger-menu.svg';
import '../../styles/components/dashboard/page-header.scss';
import rightArrow from '../../assets/right-arrow.svg';
import Modal from "./Modal.jsx";
function PageHeader(){

     // State to manage the modal visibility
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [address, setAddress] = useState("");
    
        // State to track whether the user has connected a wallet and its set to true for now
        const [walletConnected, setWalletConnected] = useState(false);

        // Get stored wallet address from localStorage when component mounts
        useEffect(() => {
            const storedAddress = localStorage.getItem("walletAddress");
            if (storedAddress) {
                setWalletConnected(true);
                setAddress(storedAddress);
            }
        }, []);
        
        
        
        // Function to open the modal
        const openModal = () => {
            setIsModalOpen(true);
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
        };
       // Simulate wallet connection (Replace this with actual wallet authentication logic when available)
        const handleWalletConnect = (address) => {
            setWalletConnected(true);
            const shortAddress = address.slice(0, 15) + "...";
            setAddress(shortAddress);
            localStorage.setItem("walletAddress", shortAddress); // Store in localStorage
            closeModal();
        };

     // Function to close the modal
     const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // Allow scrolling when modal is closed
    };
    const location = useLocation();
    const pageHeaders = {
        '/xertis/dashboard/overview': 'Overview',
        '/xertis/dashboard/certificate': 'Create certificate',
        '/xertis/dashboard/manage-certificate': 'Manage certificate',
        '/xertis/dashboard/history': 'History',
        '/xertis/dashboard/settings': 'Settings'
    }
    return(
        <>
            {isModalOpen && <Modal closeModal={closeModal} onConnect={handleWalletConnect} />}
            <section className="page-header">
                <div className="page-header-title">
                    <h2 className="d-none d-lg-block">
                        {pageHeaders[location.pathname] || "Xertis"}
                    </h2>
                    <div className="d-lg-none page-canvas">
                        <button class="btn d-lg-none toggle-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                        <img src={hamburger} alt="a hamburger icon" />
                        </button>
                        <h2>
                            {pageHeaders[location.pathname] || "Xertis"}
                        </h2>
                    </div>
                </div>

                <div className="page-title-link">
                    <button className=
                    {`${walletConnected ? 'connected' : 'not-connected'}`} onClick={walletConnected ? null : openModal}>
                        {walletConnected ? address : "Connect Wallet"}
                        {walletConnected ? <img src={rightArrow} alt="right arrow icon"/> : ''}
                    </button>
                </div>
            </section>
        </>
    )
}
export default PageHeader