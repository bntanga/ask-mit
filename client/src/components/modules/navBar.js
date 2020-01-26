import React, { Component } from "react";
import { Link } from "@reach/router";
import "./navBar.css";
import NotificationsBlock from "./notificationsBlock.js";


class NavBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
        displayNotifications: false,
        }
      }


    showNotifications=()=>{
        if (!this.state.displayNotifications){
            this.setState({displayNotifications: true})}
        else{this.setState({displayNotifications:false})
            this.props.makeNotificationsRead();
        }
        
    }
    // hideNotifications= event =>{
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.props.makeNotificationsRead();
    //     if (this.state.displayNotifications){
    //         this.setState({displayNotifications:false})
    //     }
    // }

    render() {
        console.log("Navbar notifications ", this.props.notifications)
        if (this.props.userId){
        return (
            // <div className = "NotificationsLayer" onClick = {this.hideNotifications}>
            <nav className="NavBar-container u-title-arvo" >
            <Link to = "/home" className = "NavBar-logo">
                 <div className = "Logo-ask u-inlineBlock">ask</div><div className = "Logo-MIT u-inlineBlock"> MIT</div>
            </Link>
            <div className = "RightLink-container u-inlineBlock">
                <Link to = "/home" className = "NavBar-link">  Home </Link>
                <span className = "NavBar-link" onClick = {this.showNotifications}>Notifications
                 
                 {this.state.displayNotifications? 
                 <div className = "Notifications-container" 
                 //  onClick={event => event.stopPropagation()}
                 > 
                 <NotificationsBlock notifications = {this.props.notifications}/> </div>: null}
                </span>
                <Link to = {`/profilepage1/${this.props.userId}`} className = "NavBar-link"> Your Profile </Link>
                {/* <Link to="/" className = "NavBar-link">Logout</Link> */}
            </div>
            </nav>
            // </div>
        )}
        else{
            return (
            <nav className="NavBar-container u-title-arvo" >
            <div className = "NavBar-logo">
                 <div className = "Logo-ask u-inlineBlock">ask</div><div className = "Logo-MIT u-inlineBlock"> MIT</div>
            </div>
            <div className = "RightLink-container u-inlineBlock">
                <Link to="/" className = "NavBar-link">Login</Link>
            </div>
            </nav>
        

            )
        }
    }
}

export default NavBar;