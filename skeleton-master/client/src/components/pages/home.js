import React, { Component } from "react";
import Feed from "../modules/feed";
import HomeSubBar from "../modules/homeSubBar";
import "./home.css";
import PostInput from "../modules/postInput";
import { post } from "../../utilities";
import { get } from "../../utilities";
/**
 * @param {array} subscribedTags of the user for when sending get requests for data 
 * @param {object} userObj for post requests
 */

let testStoryObj1 = {
    creatorName: "John Doe",
    creatorId: "aaa",
    time: Date.now(),
    content: "How many eyes does a chicken have?",
    likes: 10,
    postTags: ["Academics"]
  }
  let testStoryObj2 = {
    creatorName: "John Cena",
    creatorId: "bro",
    time: Date.now(),
    content: "Who let the dogs out of the big green bottle?",
    likes: 15,
    postTags: ["Social", "Parties"]

  }

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
      }
    componentDidMount(){
      // console.log(typeof(this.props.subscribedTags))
      get("api/questions", {postTags: this.props.subscribedTags})
      .then((questionsList)=>{
      let renderedList = questionsList.reverse()
      this.setState({questions:renderedList})
      });

      
      
      
      // this.setState({questions: this.state.questions.concat(questions1])}));
    };
    addPost = (storyContent)=>{
      let storyObj24 = { 
                       creatorName: this.props.userObj.userName,
                       creatorId: this.props.userObj.googleid,
                       //change to proper date
                       time:"this time",
                       content: storyContent,
                       likes:0,
                       //change this to user input
                       postTags: ["Athletics", "Social"]
        }
      post("api/questions",storyObj24)
      .then((question)=>
      this.setState({questions:[question].concat(this.state.questions)})
        );
      }

  
    
    render(){
        return(
            <div className="homeContainer">
            <PostInput addPost = {this.addPost}/>
            <div className = "HomePage">
              <div className = "Feed">
                <Feed
                creatorId = {this.props.userObj.googleid} 
                userName = {this.props.userObj.userName}
                stories = {this.state.questions}/>
              </div>
              <div className = "SubBar">
                <HomeSubBar subscribedTags = {this.props.subscribedTags}/>
                </div>
            </div>
            </div>
        )

    }
}

export default Home;
