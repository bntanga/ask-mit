import React, { Component } from "react";
import SingleNotification from "./singleNotification";


class Notifications extends Component{
    constructor(props) {
        super(props);
      }

    render(){

       let notifications =  this.props.notifications.map((notification)=><SingleNotification notification = {notification}/> )

        return (

            <div className = "NotificationsBlock">
                    {notifications}
            </div>

        )

    }


}
export default Notifications;