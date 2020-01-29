import React, { Component } from "react";
import FullPost from "./fullPost";
import { get } from "../../utilities";
import "./questionsAsked.css";

class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
        this.state = {
            likedPosts: [],
            likedComments: []
        }
      }
      componentDidMount() {
        this.refreshUser();
    }

    refreshUser = () => {
        get("/api/whoami").then(user => {
            this.setState({likedPosts: user.likedPosts, likedComments: user.likedComments});
        });
    }
    render(){
        let feed = this.props.userStories.map((story, i)=><FullPost 
        storyObj = {story} key={`Story-${i}`} 
        userName={this.props.userName} 
        likedPosts = {this.state.likedPosts}
        likedComments = {this.state.likedComments}
        refreshUser = {this.refreshUser}
        />)
        if (this.props.userStories.length ===0){
            return(

                <div className = "NoAskedQuestions">You have not asked any questions</div>
            )
        }
        return ( 
            <div className = "QuestionsAsked-container">
                {feed}
            </div>
        )
    }
 
    }

export default QuestionsAsked;
