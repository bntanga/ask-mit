import React, { Component } from "react";
import { Link } from "@reach/router";
import "./navBar.css";
import NotificationsBlock from "./notificationsBlock.js";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "502384453504-5lqr5rmdtv8e6qou09m2atnj66grb31g.apps.googleusercontent.com";


class NavBar extends Component{
    constructor(props) {
        super(props); 
        this.state = {
        displayNotifications: false,
        notificationsNumber: 0
        }
      }

    showNotifications=event=>{
        // let unreadNotifications2 = this.props.notifications.filter((notification)=> !notification.isRead)
        // if (unreadNotifications2.length===0){return null}
        if (!this.state.displayNotifications){
            this.setState({displayNotifications: true})}    
        // event.preventDefault();
        // event.stopPropagation(); 
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
                <span className = "NavBar-link NotificationsFlex" onClick = {this.showNotifications}>
                   <div className = "NotificationTextAndNumber"> 
        {this.props.notificationsNumber>0?<div className = "NotificationsNumber u-title-arvo">{this.props.notificationsNumber}</div>:null}
                    Notifications
                    </div>
                 
                 <div 
                 onClick={this.hideNotifications}
                 className ={this.state.displayNotifications?"PostNotificationsLayer":"PostNotificationsLayerHide"} >
                 </div>
                 {this.state.displayNotifications? 
                 <div className = "Notifications-container" 
                 onClick={event => event.stopPropagation()}
                 //  onClick={event => event.stopPropagation()}
                 > 
                 <NotificationsBlock notifications = {this.props.notifications}/> </div>: null}
                </span>
                <Link to = {`/profilepage1/${this.props.userId}`} className = "NavBar-link"> Your Profile </Link>
            </div>
            </nav>
            // </div>
        )}
        else{
            return (
            <nav className="NavBar-container u-title-arvo" >
            <div className = "NavBarWelcome">
                 Welcome!
            </div>
            <div className = "LoginNavBar">
            <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            render={(renderProps) => (
                <button className="Skele-button1 u-pointer" onClick={renderProps.onClick}>
                  <span className="Skele-button-text1 u-title-arvo">Login</span>
                </button>
              )}
            onFailure={(err) => console.log(err)}
          />
            </div>
            </nav>
        

            )
        }
    }
}

export default NavBar;