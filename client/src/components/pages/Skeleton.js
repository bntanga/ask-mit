import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import  simmons from "./images/simmons.jpg";
import baker from "./images/baker.jpg";



import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "628992577653-37tpc827fnafhcgbqur2rggvcnpa8jkn.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      simmons: "simmons",
      baker: "baker"
        };
  }

  componentDidMount() {
    // remember -- api calls go here!
  }
  
  getImage=(object, value)=>{
    return Object.keys(object).find(key => object[key] === value);
  }
  

  render() {
    let tagObj = {name:"simmons2222", url:simmons}
    let imgsrc;
    return (
      <>

        <div className = "GoogleButton">
        <img src = {"simmons"} className="SimmonsHall"/>
          This is the landing page. Login and click and go to manage subscriptions. Pick subscriptions and view them in home.
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        </div>
      </>
    );
  }
}

export default Skeleton;
