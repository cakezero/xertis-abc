import ConnectedWallet from "../account-settings/ConnectedWallet";
import PersonalInfo from "../account-settings/PersonalInfo";
import DeleteSignout from "../account-settings/DeleteSignout";
import '../../../../styles/components/dashboard/settings/pages/account-settings.scss';
function AccountSettings(){
    return(
        <>
            <ConnectedWallet />
            <hr className="divider d-none d-lg-block"/>
            <PersonalInfo />
            <hr className="divider"/>
            <DeleteSignout />
        </>
    )
}
export default AccountSettings;