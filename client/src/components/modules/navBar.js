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
    }
    hideNotifications= event =>{
        event.preventDefault();
        event.stopPropagation();
        this.props.makeNotificationsRead();
        if (this.state.displayNotifications){
            this.setState({displayNotifications:false})
        }
    }

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
                <div className ="HomeButton"
                onClick = {this.props.makeRerender}>
                <Link to = "/home" 
                className = "NavBar-link" > Home</Link>
                
                </div>
                <span className = "NavBar-link" onClick = {this.showNotifications}>Notifications
                 
                 <div 
                 onClick={this.hideNotifications}
                 className ={this.state.displayNotifications?"PostNotificationsLayer":"PostNotificationsLayerHide"} >
                     {this.state.displayNotifications? 
                 <div className = "Notifications-container" 
                 onClick={event => event.stopPropagation()}
                 //  onClick={event => event.stopPropagation()}
                 > 
                 <NotificationsBlock notifications = {this.props.notifications}/> </div>: null}
                 </div>
                </span>
                <Link to = {`/profilepage1/${this.props.userId}`} className = "NavBar-link"> Your Profile </Link>
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