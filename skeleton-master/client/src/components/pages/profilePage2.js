import React, { Component } from "react";
import SideBar from "../modules/sideBar";
import CommentsMade from "../modules/commentsMade";
/**
 * pass in user object
 * @param {string} userName of creator
 */

class ProfilePage2 extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <div>
                <SideBar userName = {this.props.userName}/>
                <CommentsMade />
            </div>
        )
    }
}

export default ProfilePage2;