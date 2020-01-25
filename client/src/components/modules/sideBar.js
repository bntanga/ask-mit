import React, { Component } from "react";
import { Link } from "@reach/router";
import "./sideBar.css"

/**
 * @param {string} userName of profile owner
 */

class SideBar extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        if (this.props.userRouterId===this.props.userId){
            console.log("my user ID ",this.props.userId)
            console.log("other ID ", this.props.userRouterId)
        return( 
        <div className = "Sidebar-container u-title-arvo"> 
            <div className = "NameBio-container">
                <div className = "SideBarName ">John Doe</div>
                <div className = "UserBio">Lover of all things chess</div>
            </div>
            <div className = "u-title-arvo">
                <div className = "SideBarLink QuestionsAsked">
                    <Link to =  {`/profilepage1/${this.props.userId}`}
                    className = "u-title-arvo TextColor"> Questions asked </Link></div>
                <div className = "SideBarLink"><Link to = "/profilepage3" className = "u-title-arvo TextColor">Manage Subscriptions </Link></div>
                <div className = "SideBarLink Logout"><Link to = "/profilepage3" className= "u-title-arvo TextColor">Logout </Link></div>
            </div>
        </div>
       );}
       else return (

        <div className = "Sidebar-container u-title-arvo"> 
        <div className = "NameBio-container">
            <div className = "SideBarName ">John Doe</div>
            <div className = "UserBio">Lover of all things chess</div>
        </div>
        <div className = "u-title-arvo">
            <div className = "SideBarLink QuestionsAsked"><Link to = {`/profilepage1/${this.props.userRouterId}`} className = "u-title-arvo TextColor"> Questions asked </Link></div>

        </div>
    </div>



       )

        // implement login function
    }
}
export default SideBar;