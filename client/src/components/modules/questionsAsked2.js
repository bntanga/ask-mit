import React, { Component } from "react";
import FullPost from "./fullPost";
import { get } from "../../utilities";
import "./QuestionsAsked.css";

class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        let feed = this.props.userStories.map((story, i)=><FullPost storyObj = {story} key={`Story-${i}`} userName={this.props.userName} updateLikes={() => alert("Click")}/>)
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
