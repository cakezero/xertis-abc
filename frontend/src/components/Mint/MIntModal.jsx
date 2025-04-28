import { connectMetaMask, connectPhantom, connectCoinbase, connectWalletConnect } from '../Wallet/wallet.js';
import toast from "react-hot-toast";
import '../../styles/components/dashboard/modal.scss'
import metaMaskIcon from '../../assets/dashboard/create-certificate/steps/review and submit modal/Metamask-icon.svg';
import phantom from '../../assets/dashboard/create-certificate/steps/review and submit modal/Phantom-icon.svg';
import coinBase from '../../assets/dashboard/create-certificate/steps/review and submit modal/Coinbase-icon.svg';
import walletConnect from '../../assets/dashboard/create-certificate/steps/review and submit modal/Walletconnect-icon.svg';

function MintModal({nextStep}){
    const connect = async () => {
        await connectMetaMask();
        nextStep();
    };
    return(
        <div className="modal">
            <h2>Connect a Wallet to Continue</h2>
            <div className="modal-buttons">
                <button className="modal-button-wallet" onClick={connect}>
                    <img src={metaMaskIcon} alt="Metamask icon" />
                    Connect with Metamask
                </button>
                {/* Clicking the 'connect with phantom' button takes you to the last step */}
                <button className="modal-button-wallet" onClick={connectPhantom}>
                    <img src={phantom} alt="Phantom icon" />
                    Connect with Phantom
                </button>
                <button className="modal-button-wallet" onClick={connectCoinbase}>
                    <img src={coinBase} alt="Coinbase icon" />
                    Connect with Coinbase
                </button>
                <button className="modal-button-wallet" onClick={connectWalletConnect}>
                    <img src={walletConnect} alt="WalletConnect icon" />
                    Connect with WalletConnect
                </button>
                <div className="modal-buttons-show-more">
                    <p onClick={() => toast.error("More options coming soon!")}>Show more</p>
                </div>
            </div>
        </div>
    )
}
export default MintModal