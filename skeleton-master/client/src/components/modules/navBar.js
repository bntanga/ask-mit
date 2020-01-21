import React, { Component } from "react";
import { Link } from "@reach/router";
import "./NavBar.css";


class NavBar extends Component{
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <nav className="NavBar-container u-title-arvo" >
            <Link to = "/home" className = "NavBar-logo">
                 <div className = "Logo-ask u-inlineBlock">ask</div><div className = "Logo-MIT u-inlineBlock"> MIT</div>
            </Link>
            <div className = "RightLink-container u-inlineBlock">
                <Link to = "/home" className = "NavBar-link">  Home </Link>
                <Link to = "/notifications" className = "NavBar-link"> Notifications </Link>
                <Link to = {`/profilepage1/${this.props.userId}`} className = "NavBar-link">  Profile </Link>
                <Link to="/" className = "NavBar-link">Logout</Link>
            </div>
            </nav>
        )
    }
}

export default NavBar;