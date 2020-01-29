import React, { Component } from "react";
import FullPost from "./fullPost";
import "./feed.css";
import { get } from "../../utilities";
/**
 * @param {Array} stories to render
 * @param {string} userName of person logged in
 */


 class Feed extends Component{
     // TODO: handle case when no stories
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
        let feed1 = this.props.stories
        .map((storyObj, i)=> <FullPost 
        storyObj = {storyObj} 
        key={`FullPost-${storyObj._id}`}
        userName = {this.props.userName}
        updateLikes = {this.props.updateLikes}
        likedPosts = {this.state.likedPosts}
        likedComments = {this.state.likedComments}
        refreshUser = {this.refreshUser}
        />)
    if (this.props.stories.length!==0){
        return(
            <div className = "FeedContainer">
            {feed1}
            </div>
            );}
    else{
        return(
            <div className ="NoStories u-title-arvo"> No questions to show! 
                    </div>
        )
    }

    };
 }

 export default Feed;