import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/navBar";
import Home from "./pages/home";
import ProfilePage1 from "./pages/profilePage1";
import ProfilePage3 from "./pages/profilePage3";


import "../utilities.css";
import "./App.css";
import { socket } from "../client-socket.js";

//leap of faith

import { get, post, put } from "../utilities";


//debugging imports will be put here
// debugging test objects will be defined here


let testSubScribedTags = ["Academic", "Social"];
let testUserObject = {
  userName: "Bringes Mingles",
  googleid: "123",
  subscribedTags: ["Academics",  "Dorm Life"]
}

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      allTags: ["General","Academics", "Social", "Food", "Dorm Life", "Athletics", "Business"],
      user: '',
      unsubscribedTags: [],
      subscribedTags: [],
    };

  }
  // put in componentDidMount
  getUnsubTags(arr1, arr2){
    let difference = arr1.filter(x => !arr2.includes(x));
    return difference;
  }

  addSubscription = (tag) => {
    this.state.subscribedTags.push(tag)
    const index = this.state.unsubscribedTags.indexOf(tag);
    if (index > -1) {
    this.state.unsubscribedTags.splice(index, 1);
    this.setState({subscribedTags: this.state.subscribedTags})
      }
      //leap of faith
      // put("api/usertags",{subscribedTags: this.state.subscribedTags})
      put("api/usertags",{subscribedTags: this.state.subscribedTags})
    .then((tagList)=> this.setState({subscribedTags:tagList}))
    }
  removeSubscription = (tag) => {
    this.state.unsubscribedTags.push(tag)
    const index = this.state.subscribedTags.indexOf(tag);
    if (index > -1) {
    this.state.subscribedTags.splice(index, 1);
    this.setState({subscribedTags: this.state.subscribedTags})
      }
    // another leap of faith
    put("api/usertags",{subscribedTags: this.state.subscribedTags})
    .then((tagList)=> this.setState({subscribedTags:tagList}))

  }

  componentDidMount() {
    // let unsub = this.getUnsubTags(this.state.allTags, this.state.subscribedTags)
    // this.state.unsubscribedTags = unsub
    get("/api/whoami").then((user) => {
      console.log("current user ", user)
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id,
                      });
      }
    });
  }


  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      let unsub = this.getUnsubTags(this.state.allTags, user.subscribedTags)
      this.setState({ userId: user._id,
        user: user,
        subscribedTags: user.subscribedTags,
        unsubscribedTags: unsub,
      });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
      {/* {console.log("userID ", this.state.userId)} */}
      {/* {console.log("Subscribed tags ", this.state.subscribedTags)}
      {console.log("unSubscribed tags ", this.state.unsubscribedTags)}
      {console.log("userobj ", this.state.user)} */}
      <NavBar userId = {this.state.userId}/>

        <div className = "Background-container">
        <div className =  "App-container">
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          <ProfilePage1 
          path = "/profilepage1/:userRouterId"
          userName = {this.state.user.name}
          userId = {this.state.user._id}
          />

          < ProfilePage3 
          path = "/profilepage3"
          userName = {this.state.user.name}
          subscribedTags = {this.state.subscribedTags}
          unsubscribedTags = {this.state.unsubscribedTags}
          addSubscription= {this.addSubscription}
          removeSubscription = {this.removeSubscription}
          />

          <Home 
          path = "/home"
          subscribedTags = {this.state.subscribedTags}
          userObj = {this.state.user}
          />
          <NotFound default />
        </Router>
        
        </div>
        </div>
      </>
    );
  }
}

export default App;
