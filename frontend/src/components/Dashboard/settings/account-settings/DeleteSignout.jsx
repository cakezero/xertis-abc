import '../../../../styles/components/dashboard/settings/account-settings/delete-signout.scss';
function DeleteSignout(){
    return(
        <div className="delete-account">
            <div>
                <p className='delete-link'> Delete account</p>
                <button className='signout-btn'>Sign out</button>
            </div>
        </div>
    )
}
export default DeleteSignout