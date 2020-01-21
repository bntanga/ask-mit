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
        return(
        <div className = "Sidebar-container"> 
            <div>{this.props.userName}</div>
        <div className = "u-title-arvo">
        <div><Link to = "/profilepage1" className = "SidebarLink"> Questions asked </Link></div>
        <div><Link to = "/profilepage3" className = "SidebarLink">Subscriptions </Link></div>
        </div>
        </div>
       );

        // implement login function
    }
}
export default SideBar;