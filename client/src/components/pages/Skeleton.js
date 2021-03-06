import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Router, navigate } from "@reach/router";


import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "502384453504-5lqr5rmdtv8e6qou09m2atnj66grb31g.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  componentDidMount() {
    // remember -- api calls go here!
  }
  
  getImage=(object, value)=>{
    return Object.keys(object).find(key => object[key] === value);
  }
  

  render() {
    return (
      <div className = "Background">
        <div className = "WordsContent">
        <div className = "Logo1 FlexItem1">
          <div className = "Logo-ask1 u-inlineBlock">ask</div>
          <div className = "Logo-MIT1 u-inlineBlock"> MIT</div>
        </div>
        <div className = "WordsFlex">
        <div className = "HomeText u-title-arvo FlexItem2">
          Get answers to your questions
          <div>from other MIT students </div>
        </div>
        <div className = "GoogleButton FlexItem3">
        {this.props.userId ? 
          // navigate("/home")
          null
         : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button className="Skele-button u-pointer" onClick={renderProps.onClick}>
                <span className="Skele-button-text u-title-arvo">Login with google</span>
              </button>
            )}
            buttonText="Login with google"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        </div>
        </div>
        </div>
        </div>

    );
  }
}

export default Skeleton;
