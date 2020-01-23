import React, { Component } from "react";
import FullPost from "./fullPost";
import "./feed.css";
/**
 * @param {Array} stories to render
 * @param {string} userName of person logged in
 */


 class Feed extends Component{
     // TODO: handle case when no stories
    constructor(props) {
        super(props);
        }
    render(){
        let feed1 = this.props.stories
        .map((storyObj)=> <FullPost 
        storyObj = {storyObj}
        userName = {this.props.userName}
        />)
        return(
            <div className = "FeedContainer">
            {feed1}
            </div>
            );

    };
 }

 export default Feed;