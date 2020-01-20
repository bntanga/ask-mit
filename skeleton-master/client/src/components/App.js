import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/navBar";
import Home from "./pages/home";
import ProfilePage1 from "./pages/profilePage1";
import ProfilePage2 from "./pages/profilePage2";
import ProfilePage3 from "./pages/profilePage3";


import "../utilities.css";
import "./App.css";
import { socket } from "../client-socket.js";

import { get, post } from "../utilities";


//debugging imports will be put here
// debugging test objects will be defined here


let testSubScribedTags = ["Academic", "Social"];
let testUserObject = {
  userName: "Bringes Mingles",
  googleid: "alo",
  subscribedTags: ["Academics",  "simmons"]
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
      allTags: ["Academics", "Social", "Food", "Simmons Hall"],
      user: testUserObject,
      unsubscribedTags: ["Simmons Hall", "Baker dorm"],
    };

  }
  getUnsubscribedTags(){
    let setAllTags = new Set(this.state.allTags);
    let subSetAllTags = new Set(this.state.user.subscribedTags);
    let difference = new Set([...setAllTags].filter(x=> !subSetAllTags.has(x)));
    this.setState({
      unsubscribedTags: difference
    })
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }
  addTag(Tag){
    console.log("This is my state",this.state);
    this.state.user.subscribedTags.push(Tag)
    // this.setState({
    //   allTags: this.state.allTags
    // })
  }
  removeTag(Tag){
    console.log("This is my state",this.state);
    this.state.user.subscribedTags.filter((tag1)=> tag1 !== Tag)
  };
  //   this.setState(
  //     {allTags: this.state.user.subscribedTags.filter((tag1)=> tag1 !== Tag)}
  //   );
  // };

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
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
        <NavBar/>
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
          path = "/profilepage1"
          userName = {testUserObject.userName}
          />
          <ProfilePage2 
          path = "/profilepage2"
          userName = {testUserObject.userName}
          />
          < ProfilePage3 
          path = "/profilepage3"
          userName = {testUserObject.userName}
          subscribedTags = {testUserObject.subscribedTags}
          unsubscribedTags = {this.state.unsubscribedTags}
          allTags = {this.state.allTags}
          addTag = {this.addTag.bind(this)}
          removeTag = {this.removeTag.bind(this)}
          />

          <Home 
          path = "/home"
          subscribedTags = {testSubScribedTags}
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
