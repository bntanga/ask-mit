import React, { Component } from "react";
import ManageSubsTest from "../modules/manageSubsTest.js";
import "./initialLogin.css";
class InitialLogin extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div className = "InitialLogin-container"> 
                <div className = "LandingText u-title-arvo">
                    <div className = "FlexItem3">Welcome to askMIT!</div>
                    <div className = "FlexItem1">Select your subscriptions</div>
                    <div className = "FlexItem2">You will only see questions related to what you subscribe to.</div>
                     
                </div>
                <ManageSubsTest
                subscribedTags = {this.props.subscribedTags}
                addSubscription = {this.props.addSubscription}
                removeSubscription = {this.props.removeSubscription}
                unsubscribedTags = {this.props.unsubscribedTags}
                />
            </div>






        )
    }
}
export default InitialLogin;
