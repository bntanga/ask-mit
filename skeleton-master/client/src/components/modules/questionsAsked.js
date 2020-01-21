import React, { Component } from "react";
import FullPost from "./fullPost";
import { get } from "../../utilities";
import "./questionsAsked.css"

/**
 * @param {number} userId of post creator
 */

let testStoryObj1 = {
    creatorName: "John Doe",
    time: Date.now(),
    content: "test story",
    likes: 10,
    postTags: ["Academics"]
  }
  let testStoryObj2 = {
    creatorName: "John Cena",
    time: Date.now(),
    content: "test story 2",
    likes: 15,
    postTags: ["Social", "Parties"]

  }
class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ListOfStoryObj : [testStoryObj2, testStoryObj1],
        }
      }
    
    // componentDidMount(){
    //   console.log(" ID being sent to backend " , this.props.userRouterId)
    //   // testing 
    //   get("api/user", {userId: this.props.userRouterId}).then((user)=>console.log(user))
    //   get("api/userquestions", {creatorId: this.props.userRouterId}).then((stories)=>
    //   this.setState({
    //     ListOfStoryObj: stories.reverse(),
    //   }));

    // }
    render(){
  
        let feed = this.props.userStories
        .map((storyObj1)=> 
        <FullPost storyObj = {storyObj1}/>
        );
        return (
        <div className = "QuestionsAsked-container">
        {feed}
        </div>
            );
};

}

export default QuestionsAsked;