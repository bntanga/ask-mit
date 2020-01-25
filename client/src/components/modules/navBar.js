import React, { Component } from "react";
import { Link } from "@reach/router";
import "./navBar.css";
import Notifications from "./notificationsBlock.js";


class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
        displayNotifications: false,
        }
      }


    showNotifications=()=>{
        if (this.state.displayNotifications){
            this.setState({displayNotifications: false})
        }
        else{this.setState({displayNotifications:true})}
    }
    render() {
        console.log("Navbar notifications ", this.props.notifications)
        if (this.props.userId){
        return (
            <nav className="NavBar-container u-title-arvo" >
            <Link to = "/home" className = "NavBar-logo">
                 <div className = "Logo-ask u-inlineBlock">ask</div><div className = "Logo-MIT u-inlineBlock"> MIT</div>
            </Link>
            <div className = "RightLink-container u-inlineBlock">
                <Link to = "/home" className = "NavBar-link">  Home </Link>
                <span className = "NavBar-link" onClick = {this.showNotifications}>Notifications</span>
                {this.state.displayNotifications? <Notifications notifications = {this.props.notifications}/> : null}
                {/* <Link to = "/notifications" className = "NavBar-link"> Notifications </Link> */}
                <Link to = {`/profilepage1/${this.props.userId}`} className = "NavBar-link"> Your Profile </Link>
                <Link to="/" className = "NavBar-link">Logout</Link>
            </div>
            </nav>
        )}
        else{
            return (
            <nav className="NavBar-container u-title-arvo" >
            <div className = "NavBar-logo">
                 <div className = "Logo-ask u-inlineBlock">ask</div><div className = "Logo-MIT u-inlineBlock"> MIT</div>
            </div>
            <div className = "RightLink-container u-inlineBlock">
                {/* <Link to = "/notifications" className = "NavBar-link"> Notifications </Link> */}
                <Link to="/" className = "NavBar-link">Login</Link>
            </div>
            </nav>

            )
        }
    }
}

export default NavBar;