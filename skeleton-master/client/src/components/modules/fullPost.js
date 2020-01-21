import React, { Component } from "react";
import AStory from "./aQuestion";
import CommentsBlock from "./commentsBlock";
import "./fullPost.css";
import CommentInput from "./commentInput";
import { get, post } from "../../utilities.js";

/** receives 
 * @Param {object} storyObj
 * @param {string} userName 
 * 
 */

// test state objects here
let testCommentObj = {
    creatorName: "Brian Ntanga",
    time: Date.now(),
    content: "test comment",
    parentId: 3,
    likes: 5,
  }
  let testCommentObj2 = {
    creatorName: "Brayo ",
    time: Date.now(),
    content: "test comment 2",
    parentId: 4,
    likes: 5,
  }
  let testCommentObj3 = {
    creatorName: "Brayo ",
    time: Date.now(),
    content: "test comment 2",
    parentId: 4,
    likes: 5,
  }
 

 class FullPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // test objects put in
            commentObjList : [],
        };
      }
/*       addAComment(value){
        post("/api/comment", { parent: this.props.parentId, content: value };).then((comment) => {
            // display this comment on the screen
            this.props.addAComment(comment);
          });

    }
    */
   addComment = (commentContent) =>{
     let commentObj24 = {
       creatorName: this.props.userName,
       creatorId: this.props.creatorId,
       time: "this time",
       content: commentContent,
       parentId: this.props.storyObj._id,
       likes: 0,
     }

    post("api/comments", commentObj24).then((comment)=>
     this.setState(
       {commentObjList: this.state.commentObjList.concat(comment)})
     )
   }
    componentDidMount(){
      get("/api/comments",{parentId: this.props.storyObj._id})
      .then((comments)=>
      this.setState({commentObjList: comments}));
    }
    render(){
        return (
            <div className = "fullPost-container">
                <AStory storyObj = {this.props.storyObj} postTags = {this.props.storyObj.postTags}/>
                <CommentInput addComment = {this.addComment}/>
                <CommentsBlock commentObjList = {this.state.commentObjList}/>
            </div>
        );
    }
    
 }
 export default FullPost;