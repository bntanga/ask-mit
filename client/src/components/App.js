import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/navBar";
import Home from "./pages/home";
import ProfilePage1 from "./pages/profilePage1";
import ProfilePage3 from "./pages/profilePage3";
import InitialLogin from "./pages/initialLoginTest";


import "../utilities.css";
import "./App.css";
import { socket } from "../client-socket.js";

//leap of faith

import { get, post, put } from "../utilities";


//debugging imports will be put here
// debugging test objects will be defined here


/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      allTags: ["General", "Academic", "Social", "Business",
       "Mental Health", "Food", "Clubs",
       "Class of 20", "Class of 21", "Class of 22", "Class of 23",
       "Simmons Hall", "Baker House", "New House", "MacGregor House", 
       "Random Hall", "East Campus", "McCormick Hall", "Next House", "Burton Conner","Other"],
      user: '',
      unsubscribedTags: [],
      subscribedTags: [],
      userBio: "",
      notifications: [],
      notificationsNumber: 0,
      other: ""
    };

    this.homePageRef = React.createRef();

  }

  makeNotificationsRead=()=>{
    //fix this
    let newNotifications = this.state.notifications.map((notification)=> {return {...notification, isRead: true}});
    console.log(newNotifications)
    this.setState({notifications: [], notificationsNumber:0});

    // let newNotifications = this.state.notifications.filter((notification) => notification.isRead)
    console.log("new notifications ", newNotifications)
    // this.setState({notifications: newNotifications, notificationsNumber:0});
    post("api/makenotificationsread", {updatedNotifications: []})
    
  }
  // put in componentDidMount
  getUnsubTags(arr1, arr2){
    let difference = arr1.filter(x => !arr2.includes(x));
    return difference;
  }
  
  resetHomePageFilters = () => {
    console.log("attempting reset");
    if(this.homePageRef.current) {
      this.homePageRef.current.resetFilters();
    }
  }

 
  addSubscription = (tag) => {
    if (this.state.subscribedTags.includes(tag)){
      return ("non")
    }
    
    const index = this.state.unsubscribedTags.indexOf(tag);
    if (index > -1) {
    this.state.unsubscribedTags.splice(index, 1);
    this.state.subscribedTags.push(tag)
    put("/api/usertags",{subscribedTags: this.state.subscribedTags})
    .then((user)=> this.setState({subscribedTags:user.subscribedTags}))
      }
    }
  removeSubscription = (tag, callback) => {

    this.state.unsubscribedTags.push(tag)
    const index = this.state.subscribedTags.indexOf(tag);
    if (index > -1) {
    this.state.subscribedTags.splice(index, 1);
    // this.setState({subscribedTags: this.state.subscribedTags})
    put("/api/usertags",{subscribedTags: this.state.subscribedTags})
    .then((user)=> {
      this.setState({subscribedTags:user.subscribedTags}, callback)})
    
      }
    

  }
  editBio = (bio)=>{
    return put("/api/editbio", {newBio:bio }).then((user1)=>this.setState({user: user1 }));
  }

  componentDidMount() {
    // let unsub = this.getUnsubTags(this.state.allTags, this.state.subscribedTags)
    // this.state.unsubscribedTags = unsub
    
    get("/api/whoami").then((user) => {
      let unsub = this.getUnsubTags(this.state.allTags, user.subscribedTags)
      console.log("current user ", user)
      if (user._id) {
        // they are registed in the database, and currently logged in.
        let unreadNotifications4 = user.notifications.filter((notification)=> !notification.isRead)
        let number = unreadNotifications4.length;
        this.setState({ userId: user._id,
          user: user,
          subscribedTags: user.subscribedTags,
          unsubscribedTags: unsub,
          userBio: user.bio,
          notifications: user.notifications,
          notificationsNumber: number,
        });

        // if(user.subscribedTags.length === 0) {
        //   navigate("/initiallogin")
        // }
      }
    });
    socket.on("notification", (notification) => {
      this.state.notifications.push(notification)
      this.state.notificationsNumber++
      this.setState({notifications: this.state.notifications})
    })
  }

  handleLogin = (res) => {
    console.log(`Logged in as: ${res.profileObj.name }`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      let unsub = this.getUnsubTags(this.state.allTags, user.subscribedTags)
      let unreadNotifications5 = user.notifications.filter((notification)=> !notification.isRead)
      let number3 = unreadNotifications5.length;

      this.setState({ userId: user._id,
        user: user,
        subscribedTags: user.subscribedTags,
        unsubscribedTags: unsub,
        userBio: user.bio,
        notifications: user.notifications,
        notificationsNumber: number3,
      }, () => {
        if(user.subscribedTags.length === 0) {
          navigate("/initiallogin")
        }
        else{
        navigate("/home")
        }
      });
      // post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
    navigate("/");
  };

  render() {
    return (
      

        <div className = "Background-container">
        <NavBar 
        userId = {this.state.userId}
        notifications = {this.state.notifications}
        makeNotificationsRead = {this.makeNotificationsRead}
        makeRerender = {this.resetHomePageFilters}
        notificationsNumber = {this.state.notificationsNumber}
        />
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
          userId = {this.state.userId}
          handleLogout = {this.handleLogout}
          editBio = {this.editBio}
          />

          < ProfilePage3 
          path = "/profilepage3/:userRouterId"
          userName = {this.state.user.name}
          subscribedTags = {this.state.subscribedTags}
          unsubscribedTags = {this.state.unsubscribedTags}
          addSubscription= {this.addSubscription}
          removeSubscription = {this.removeSubscription}
          userId = {this.state.userId}
          handleLogout = {this.handleLogout}
          editBio = {this.editBio}
          />
          <InitialLogin
          path = "/initiallogin"
          userName = {this.state.user.name}
          subscribedTags = {this.state.subscribedTags}
          unsubscribedTags = {this.state.unsubscribedTags}
          addSubscription= {this.addSubscription}
          removeSubscription = {this.removeSubscription}
          userId = {this.setState.userId}
          />

          <Home 
          path = "/home"
          subscribedTags = {this.state.subscribedTags}
          userObj = {this.state.user}
          ref = {this.homePageRef}
          />
          <NotFound default />
        </Router>
        </div>
        </div>
       
    );
  }
}

export default App;
