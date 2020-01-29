import React, { Component } from "react";
import { Link } from "@reach/router";
import "./aQuestion.css";
import TagsBlock from "./tagsBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

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
            <Link to = {`/profilepage1/${this.props.storyObj.creatorId}`} className = "u-title-arvo CreatorName">
            <div className = "CreatorName2">{this.props.storyObj.creatorName}</div>
            <div className = "UserBio u-title-arvo">{this.props.storyObj.creatorBio}</div>
            </Link>
            <div className = "Story-container">
                <div className = "TagsTime-container u-title-arvo">
                    <TagsBlock postTags = {this.props.postTags}/>
                    <div className = "u-title-arvo TimeContainer" >{this.props.storyObj.time}</div>
                </div>
                <div className = "StoryContent u-title-arvo">{this.props.storyObj.content}</div>
            </div>
        </div>
        );
    };
}

export default  AStory;