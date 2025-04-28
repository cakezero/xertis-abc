import PasswordTitle from "../password-security/PasswordTitle";
import ChangePassword from "../password-security/ChangePassword";
function PasswordSecurity(){
    return(
        <div className="password-security">
            <PasswordTitle />
            <ChangePassword />
        </div>
    )
}
export default PasswordSecurity;