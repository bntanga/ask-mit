import React, { Component } from "react";
import FullPost from "./fullPost";
import { get } from "../../utilities";
import "./QuestionsAsked.css";

class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        let feed = this.props.userStories.map((story)=><FullPost storyObj = {story}/>)
        return (
            <div className = "QuestionsAsked-container">
                {feed}
            </div>
        )
    }

    }

export default QuestionsAsked;
