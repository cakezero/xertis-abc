import NotificationsTitle from "../notification/NotificationTitle";
import EmailNotification from "../notification/EmailNotification";
function Notifications(){
    return(
        <div className="notifications">
            <NotificationsTitle />
            <EmailNotification />
        </div>
    )
}

export default Notifications