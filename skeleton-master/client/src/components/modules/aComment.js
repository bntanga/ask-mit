import React, { Component } from "react";
import { Link } from "@reach/router";
import "./aComment.css";
/**
 * 
 * @param {object} commentObj obj
 */

class AComment extends Component {
    constructor(props) {
        super(props);
      }
    render (){
        return (
        <div className = "Comment-container">
            <Link to = "/profilepage1" className = "Creator-name u-title-arvo">
            {this.props.commentObj.creatorName} :
            </Link>
             {/* <div>{this.props.commentObj.time}</div> */}
            <div className = "Comment-content">{this.props.commentObj.content}</div>
            {/* <div> likes: {this.props.commentObj.likes}</div> */}
        </div>)
        
    };
}


export default AComment;