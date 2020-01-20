import React, { Component } from "react";
import SideBar from "../modules/sideBar";
import ManageSubs from "../modules/manageSubs";

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
            <div>
                <SideBar userName = {this.props.userName}/>
                <ManageSubs 
                subscribedTags = {this.props.subscribedTags}
                allTags = {this.props.allTags}
                addTag = {this.props.addTag}
                removeTag = {this.props.removeTag}
                unsubscribedTags = {this.props.unsubscribedTags}
                 />
            </div>
        );
    }
}

export default ProfilePage3;