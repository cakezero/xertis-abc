import '../../../../styles/components/dashboard/settings/notification/email-notification.scss';
function EmailNotification(){
    return(
        <div className="email-notification">
            <div className="email-notification-header">
                <h1>Email Notifications</h1>
                <div className='permission'>
                    <div className='permission-item'>
                        <div className='permission-item-title'>
                            <h3>Always send email notifications</h3>
                            <p>
                                Receive emails about actiivity in your dashboard, even when you are active on the webapp.
                            </p>
                        </div>

                        <div class="form-check form-switch">
                        <input class="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                        </div>
                    </div>

                    <div className='permission-item'>
                        <div className='permission-item-title'>
                            <h3>Promotions and updates</h3>
                            <p>
                                Be the first to know about promotions, updates and new features from Xertis!
                            </p>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailNotification;