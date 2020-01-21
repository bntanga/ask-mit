import React, { Component } from "react";
import Feed from "../modules/feed";
import HomeSubBar from "../modules/homeSubBar";
import "./home.css";
import PostInput from "../modules/postInput";
import { post } from "../../utilities";
import { get } from "../../utilities";

import PostPopup from "../modules/postPopup.js";
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
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            questions: [],
            className:"popUpContainerAlternate",
            inputClassName:"InputClick u-title-arvo",
        }
      }
    componentDidMount(){
      // console.log(typeof(this.props.subscribedTags))
      //test stuff
      // get("api/userquestions", {creatorId: this.props.userObj._id}).then((user)=>console.log("test1 user", user));
      get("api/questions", {postTags: this.props.subscribedTags})
      .then((questionsList)=>{
      let renderedList = questionsList.reverse()
      this.setState({questions:renderedList})
      });

      
      
      
      // this.setState({questions: this.state.questions.concat(questions1])}));
    };
    addPost = (storyContent, postTags1)=>{
      let storyObj24 = { 
                       creatorName: this.props.userObj.name,
                       creatorId: this.props.userObj._id,
                       //change to proper date
                       time:"this time",
                       content: storyContent,
                       likes:0,
                       //change this to user input
                       postTags: postTags1
        }
      post("api/questions",storyObj24)
      .then((question)=>
      this.setState({questions:[question].concat(this.state.questions)})
        );
      }

    handlePopUp(){

      this.setState({className:"popUpContainer"});
      this.setState({inputClassName:"InputClickAlternate"});


    }
    handleSubmit(){
      this.setState({className:"popUpContainerAlternate"});
    }
    handleFilter(filterTag){
      get("api/questions", {postTags:[filterTag]})
      .then((questionsList)=>{
        let renderedList = questionsList.reverse();
        this.setState({questions:renderedList});
        });

    }
  
    
    render(){
        return(
            <div className="homeContainer">
            <PostPopup className={this.state.className} 
            addPost = {this.addPost} 
            userTags = {this.props.subscribedTags}
            handleSubmit = {this.handleSubmit}
            />
            <div onClick={this.handlePopUp.bind(this)} className ={this.state.inputClassName} >What's your question?</div>

            
            {/* <PostInput  addPost = {this.addPost}/> */}
            <div className = "HomePage">
              <div className = "Feed">
                <Feed
                creatorId = {this.props.userObj._id} 
                userName = {this.props.userObj.name}
                stories = {this.state.questions}/>
              </div>
              <div className = "SubBar">
                <HomeSubBar subscribedTags = {this.props.subscribedTags}
                            handleFilter = {this.handleFilter}
                />
                </div>
            </div>
            </div>
        )

    }
}

export default Home;
