import '../../../../styles/components/dashboard/settings/notification/notification-title.scss';
function NotificationsTitle(){
    return(
        <div className="notification-title">
            <div className="notification-header">
                <div className='header-details'>
                    <h1>Configure Notifications Settings</h1>
                    <p>Update your notification preferences here.</p>
                </div>

                <div className="general-notification">
                    <h1>General Settings</h1>
                    <div className='general-notification-working'>
                        <div className='general-notification-working-title'>
                            <h3>Activity notifications</h3>
                            <p>
                                Receive notifications on your account's general activites via your dashboard
                            </p>
                        </div>

                        <div class="form-check form-switch">
                        <input class="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NotificationsTitle