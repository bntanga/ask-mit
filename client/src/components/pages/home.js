import React, { Component } from "react";
import Feed from "../modules/feed";
import HomeSubBar from "../modules/homeSubBar";
import "./home.css";
import PostInput from "../modules/postInput";
import { post } from "../../utilities";
import { get } from "../../utilities";
import {put } from "../../utilities";

import PostPopup from "../modules/postPopup.js";


// // const simmons = require('./simmons.jpeg');
/**
 * @param {array} subscribedTags of the user for when sending get requests for data 
 * @param {object} userObj for post requests
 */


class Home extends Component {
    constructor(props) {
        super(props);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            questions: [],
            isPopupVisible:false,
            inputClassName:"InputClick u-title-arvo",
            activeTag: ""
        }
      }
    componentDidMount(){
      get("api/questions", {postTags: this.props.subscribedTags})
      .then((questionsList)=>{
      let renderedList = questionsList.reverse()
      this.setState({questions:renderedList})
      });
      
      // this.setState({questions: this.state.questions.concat(questions1])}));
    };

    componentDidUpdate(prevProps) {
      if(this.props.subscribedTags !== prevProps.subscribedTags) {
        get("api/questions", {postTags: this.props.subscribedTags})
      .then((questionsList)=>{
      let renderedList = questionsList.reverse()
      this.setState({questions:renderedList})
      });
      }
    }
      updateLikes= (Id) =>{
        return put("/api/questionlikes",{_id:Id}).then((question)=>{
        if (this.state.activeTag){
          get("api/questions", {postTags:[this.state.activeTag]}).then((questionsList)=>
          {let renderedList = questionsList.reverse();
            this.setState({questions:renderedList})})
        }
        else{get("api/questions", {postTags:[this.props.subscribedTags]}).then((questionsList)=>{
          let renderedList = questionsList.reverse()
          this.setState({questions:renderedList})

        })
      
      
      }//end of else

      }//first call back
              
        
        )



      };




  resetFilters = () => {
    window.scrollTo(0, 0);
    get("api/questions", {postTags: this.props.subscribedTags})
      .then((questionsList)=>{
      let renderedList = questionsList.reverse()
      this.setState({questions:renderedList, activeTag:""})
      });
  };

getCurrentDate = () => {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let mmm;
      switch(mm) {
      case "01":
      mmm = "Jan";
      break;
      case "02":
      mmm = "Feb";
      break;
      case "03":
      mmm = "Mar";
      break;
      case "04":
      mmm = "Apr"
      break;
      case "05":
      mmm = "May"
      break;
      case "06":
      mmm = Jun;
      break;
      case "07":
      mmm = Jul;
      break;
      case "08":
      mmm = "Aug";
      break;
      case "09":
      mmm = "Sep"
      break;
      case "10":
      mmm = "Oct";
      break;
      case "11":
      mmm = "Nov";
      break;
      case "12":
      mmm = "Dec"
      break;
      }

      today = mmm + ' ' + dd + ', ' + yyyy;
      return (today)
    }

    addPost = (storyContent, postTags1, anonymous)=>{
      let storyObj24;
      if(anonymous){
        storyObj24 = {
          creatorName: "Anonymous",
          creatorId: "Anonymous",
          time: this.getCurrentDate(),
          content: storyContent,
          likes: 0,
          postTags: postTags1,
          creatorBio: ""
        }
      }
      else{
      storyObj24 = { 
                       creatorName: this.props.userObj.name,
                       creatorId: this.props.userObj._id,
                       //change to proper date
                       time:this.getCurrentDate(),
                       content: storyContent,
                       likes:0,
                       postTags: postTags1,
                       creatorBio: this.props.userObj.bio,
        }}
      post("api/questions",storyObj24)
      .then((question)=> {
            this.setState({questions:[question].concat(this.state.questions)})}
        );
      }

    handlePopUp(){

      this.setState({isPopupVisible:true});
      this.setState({inputClassName:"InputClickAlternate"});


    }
    handleSubmit(){
      this.setState({isPopupVisible:false});
      this.setState({inputClassName:"InputClick"});

    }
    handleFilter(filterTag){
      get("api/questions", {postTags:[filterTag]})
      .then((questionsList)=>{
        let renderedList = questionsList.reverse();
        this.setState({questions:renderedList, activeTag:filterTag});
        });
      window.scrollTo(0, 0);
    }
  
    
    render(){
        return(
            <div className="homeContainer">
            { this.state.isPopupVisible ?
              <PostPopup
            addPost = {this.addPost} 
            userTags = {this.props.subscribedTags}
            handleSubmit = {this.handleSubmit}
            />
          :
          null
          }
           

            
            <div className = "HomePage">
            <div className = "SubBar">
                <HomeSubBar subscribedTags = {this.props.subscribedTags}
                            handleFilter = {this.handleFilter}
                            activeTag = {this.state.activeTag}
                />
                </div>
              <div className = "Feed">
              <div onClick={this.handlePopUp.bind(this)} className ={this.state.inputClassName} >What's your question?</div>
                <Feed
                creatorId = {this.props.userObj._id} 
                userName = {this.props.userObj.name}
                stories = {this.state.questions}
                updateLikes = {this.updateLikes}/>
              </div>
            </div>
            </div>
        )

    }
}

export default Home;
