import React, { Component } from "react";
import { Link } from "@reach/router";
import "./aQuestion.css";
import TagsBlock from "./tagsBlock";

/**
 * 
 * @param {object} storyObj obj
 */

class AStory extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
        <div>
            <Link to = {"/profile"} className = "u-title-arvo CreatorName">
            <h4 className = "CreatorName2">{this.props.storyObj.creatorName}</h4>
            </Link>
        <div className = "Story-container">
        <div className = "TagsTime-container u-title-arvo">
            <TagsBlock postTags = {this.props.postTags}/>
        <div className = "u-title-arvo TimeContainer" >{this.props.storyObj.time}</div>
        </div>
            <div className = "StoryContent u-title-arvo">{this.props.storyObj.content}</div>
        </div>
        <div className = "Likes-container">likes: {this.props.storyObj.likes}</div>
        </div>
        );
    };
}

export default  AStory;