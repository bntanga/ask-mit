import React, { Component } from "react";
import SingleNotification from "./singleNotification";
import "./notificationsBlock.css";


class NotificationsBlock extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        let unreadNotifications1 = this.props.notifications.reverse()
        
        let unreadNotifications = unreadNotifications1.filter((notification)=> !notification.isRead)
       let shownNotifications =  unreadNotifications.map((notification)=><SingleNotification notification = {notification}/> )
        if (unreadNotifications.length===0){
            return (
                <div className = "  EmptyNotifications u-title-arvo">No new notifications!</div>
            )
        }
        else{
        return (

            <div className = "NotificationsBlock2">
                    {shownNotifications}
            </div>

        )
        }
    }


}
export default NotificationsBlock; 