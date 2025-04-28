import '../../../../styles/components/dashboard/settings/account-settings/personal-info.scss';
import refresh from '../../../../assets/dashboard/settings/account-settings/refresh-icon.svg';
import { useState } from 'react';
function PersonalInfo(){
    const input = [
        {label: 'First name', type: 'text', id: 'firstName'},
        {label: 'Last name', type: 'text', id: 'lastName'},
        {label: 'Email', type: 'email', id: 'email'}
    ]
    const [userData, setUserData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'xertis@gmail.com'
    })
    return(
        <div className="personal-info">
            <div className="personal-info-header">
                <div className='header-title'>
                    <h1>Personal Info</h1>
                    <p className='d-none d-lg-block'>Update your personal information here.</p>
                    <p className='d-lg-none'>Update your personal info here.</p>
                </div>
                <div className='update-profile'>
                    <button>
                        <img src={refresh} alt="a refresh icon" />
                        <p className='d-none d-lg-block'>Update profile</p>
                        <p className='d-lg-none'>Add new</p>
                    </button>
                </div>
            </div>

            <div className="form-info">
                <form action="">
                    {input.map((data, index) => (
                        <div className="input-group" key={index}>
                            <label htmlFor={data.label}>{data.label}</label>
                            <input 
                            type={data.type} 
                            id={data.id} 
                            value={userData[data.id]}
                            onChange={(e) => setUserData({...userData, [data.id]: e.target.value})}
                            />
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default PersonalInfo;