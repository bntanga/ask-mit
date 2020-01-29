import React, { Component } from "react";
import SideBar from "../modules/sideBar";
import QuestionsAsked from "../modules/questionsAsked2.js";
import { get } from "../../utilities.js";
import "./profilePage1.css"; 

/**pass in userobject
 * @param {string} userName of creator
 */
let testStoryObj1 = {
    creatorName: "John Doe",
    time: Date.now(),
    content: "test story",
    likes: 10,
    postTags: ["Academics"]
  }

class ProfilePage1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ListOfStoryObj : [],
        }
      }
      componentDidMount(){

        // const userid = JSON.stringify(this.props.userRouterId);
        // console.log(typeof(userid));
        // get("api/user2")

        //   console.log("user ID being sent to backend ", userid)
        get("/api/userquestions", {creatorId: this.props.userRouterId})
        .then((questions)=>
        {let renderedQuestions = questions.reverse()
        this.setState({ListOfStoryObj: renderedQuestions})});
    }
    render(){
        console.log("userid IN PP ",this.props.userId)
         console.log(" user router ID in pp ", this.props.userRouterId)

        return(
            <div className = "ProfilePage1-container">
                <div><SideBar 
                userName = {this.props.userName}
                userId = {this.props.userId}
                userRouterId = {this.props.userRouterId}
                handleLogout = {this.props.handleLogout}
                editBio = {this.props.editBio}
                />
                </div>
                <div><QuestionsAsked 
                userRouterId = {this.props.userRouterId} 
                userStories = {this.state.ListOfStoryObj}/> 
                </div>
            </div>
        )
    }
}

export default ProfilePage1;