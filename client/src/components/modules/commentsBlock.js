import React, { Component } from "react";
import AComment from "./aComment";
import "./commentsBlock.css";

/**
 * 
 * @param {object} commentObjList obj
 */
class CommentsBlock extends Component{
    constructor(props) {
        super(props);
      }
    render(){
         let listOfComments = this.props.commentObjList
         .map((commentObj1)=> <AComment commentObj = {commentObj1} updateLikes = {this.props.updateLikes}/>);
        return (<div className = "CommentsBlock-container">
            {listOfComments} 
            </div>)
      };
}

export default CommentsBlock;