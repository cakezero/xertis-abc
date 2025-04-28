import '../../../../styles/components/dashboard/settings/password-security/password-title.scss';
function PasswordTitle(){
    return(
        <div className="password-title">
            <div className='password-header'>
                <h1>Security and Password Page</h1>
                <p>Update Account Security Details here.</p>
            </div>
            <div className='update-btn'>
                <p>Cancel</p>
                <button>Save changes</button>
            </div>
        </div>
    )
}

export default PasswordTitle