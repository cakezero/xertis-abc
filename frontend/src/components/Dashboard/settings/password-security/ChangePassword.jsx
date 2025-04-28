import { useState } from 'react';
import '../../../../styles/components/dashboard/settings/password-security/change-password.scss';
import keyIcon from '../../../../assets/dashboard/settings/password-security/key-icon.svg';
import lockIcon from '../../../../assets/dashboard/settings/password-security/lock-icon.svg';
import eyeIcon from '../../../../assets/dashboard/settings/password-security/eye-icon.svg';
function ChangePassword(){

     // State to manage visibility for each input field
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const input = [
        {label: 'Old Password', id: 'oldPassword', disabled: true},
        {label: 'New Password', id: 'newPassword', disabled: false},
        {label: 'Confirm Password', id: 'confirmPassword', disabled: false}
    ]
    const [passwordData, setPasswordData] = useState({
            oldPassword: 'Itadori',
            newPassword: 'Nanami-san',
            confirmPassword: 'Nanami-san'
        })
    return(
        <div className="change-password">
            <div className='change-password-title'>
                <img src={keyIcon} alt="a key icon" />
                Change Password
            </div>
            <div className='password-form'>
                <form action="">
                    {input.map((data) => (
                        <div className="input-group" key={data.id}>
                            <label htmlFor={data.id}>{data.label}</label>
                            <input 
                            type={showPassword[data.id] ? 'text' : 'password'} 
                            id={data.id} 
                            //Checks if the inputs disabled property is false or true
                            disabled={data.disabled}
                            value={passwordData[data.id]}
                            onChange={(e) => setPasswordData({...passwordData, [data.id]: e.target.value})}
                            />
                            <img className='lock-icon' src={lockIcon} alt="a lock icon" />
                            <img className={`eye-icon ${showPassword[data.id] ? "active" : ""}`} src={eyeIcon} alt="an eye icon" 
                             onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  [data.id]: !prev[data.id],
                                }))
                              }/>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;