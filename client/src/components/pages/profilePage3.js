import React, { Component } from "react";
import SideBar from "../modules/sideBar";
import ManageSubsTest from "../modules/manageSubsTest"; 
import "./profilePage3.css";

/**pass in userobject
 * @param {string} userName of creator 
 * @param {array} subscribedTags of user
 * @param {array} allTags in app
 * @param {function} removeTag from user list
 * @param {function} addTag to user subscription
 */

class ProfilePage3 extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <div className = "ProfilePage3-container">
                <SideBar 
                userName = {this.props.userName}
                userId = {this.props.userId}
                userRouterId = {this.props.userRouterId}
                />
                <ManageSubsTest
                subscribedTags = {this.props.subscribedTags}
                addSubscription = {this.props.addSubscription}
                removeSubscription = {this.props.removeSubscription}
                unsubscribedTags = {this.props.unsubscribedTags}
                 />
            </div>
        );
    }
}

export default ProfilePage3;