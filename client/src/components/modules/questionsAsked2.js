import React, { Component } from "react";
import FullPost from "./fullPost";
import { get } from "../../utilities";

class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ListOfStoryObj : [],
        }
      }
    componentDidMount(){
        get("/userquestions", {creatorId: this.props.userRouterId}).then((stories)=>this.setState({ListOfStoryObj: stories}));
    }
    render(){
        let feed = this.state.ListOfStoryObj.map((story)=><FullPost storyObj = {story}/>)
        return (
            <div>
                {feed}
            </div>
        )
    }

    }

export default QuestionsAsked;
