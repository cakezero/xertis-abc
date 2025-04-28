import '../../../../styles/components/dashboard/settings/account-settings/connected-wallet.scss';
import addBtn from '../../../../assets/dashboard/settings/account-settings/add-icon.svg';
import certificateIcon from '../../../../assets/dashboard/settings/account-settings/certificate-icon.svg';
import deleteIcon from '../../../../assets/dashboard/settings/account-settings/delete-icon.svg';
function ConnectedWallet(){
    return(
        <div className="connected-wallet">
            <div className="wallet d-none d-lg-flex">
                <div className="wallet-header">
                    <h1>Connected Wallet</h1>
                    <p>Update your wallet address here.</p>
                </div>
                <div className='update-wallet'>
                    <button>
                        <img src={addBtn} alt="add icon" />
                        Update wallet
                    </button>
                </div>
            </div>
            <div className="wallet-address">
                <div className="wallet-address-title">
                    <img src={certificateIcon} alt="a certificate icon" />
                    <p className='d-none d-lg-block'>0x7g6FVYUvg8YVH Jlg78oYBU</p>
                    <div className='d-lg-none user-name'>
                        <h3>KAMADO TANJIRO</h3>
                        <p>DEMON SLAYER</p>
                    </div>
                </div>

                <div className='wallet-address-delete'>
                    <img src={deleteIcon} alt="" />
                </div>
            </div>
        </div>
    )
}
export default ConnectedWallet;