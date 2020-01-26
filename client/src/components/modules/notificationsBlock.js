import React, { Component } from "react";
import SingleNotification from "./singleNotification";


class NotificationsBlock extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        let unreadNotifications = this.props.notifications.filter((notification)=> !notification.isRead)
       let shownNotifications =  unreadNotifications.map((notification)=><SingleNotification notification = {notification}/> )

        return (

            <div className = "NotificationsBlock">
                    {shownNotifications}
            </div>

        )

    }


}
export default NotificationsBlock;