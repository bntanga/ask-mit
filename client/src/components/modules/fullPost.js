import React, { Component } from "react";
import AStory from "./aQuestion";
import CommentsBlock from "./commentsBlock";
import "./fullPost.css";
import CommentInput from "./commentInput";
import { get, post, put } from "../../utilities.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

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
            showComments : true,
        };
      }
   displayComments=()=>{
        if (this.state.showComments){
          this.setState({showComments: false})
        }
        else{
          this.setState({showComments: true})
        }
   }
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
   updateLikes= (isLiked, Id) =>{
        if (isLiked){
          //must return new comment obj
          put("api/commentlikes", {_id: Id, add: false})
   }else{
    put("api/commentlikes", {_id: Id, add: true})
   }
  }
    componentDidMount(){
      get("/api/comments",{parentId: this.props.storyObj._id})
      .then((comments)=>
      this.setState({commentObjList: comments}));
    }
    render(){
      if(this.state.showComments){
        return(
          <div className = "fullPost-container">
                <AStory storyObj = {this.props.storyObj} postTags = {this.props.storyObj.postTags}/>
              <div className = "LikesCommentButton-container">
                <div className = "Likes-container">
                    <FontAwesomeIcon icon = {faHeart} 
                    className = "heartIcon" 
                    />
                    <div className = "LikesNumber">{this.props.storyObj.likes}</div>
                </div>
                <div className = "ShowCommentsButon u-title-arvo" onClick = {this.displayComments}>Hide comments</div>
              </div>
                <CommentInput addComment = {this.addComment}/>
                <CommentsBlock 
                commentObjList = {this.state.commentObjList}
                updateLikes = {this.updateLikes}
                />
            </div>
          ) 
      }
      else{
        return (
        <div className = "fullPost-container">
            <AStory storyObj = {this.props.storyObj} postTags = {this.props.storyObj.postTags}/>
          <div className = "LikesCommentButton-container">
              <div className = "Likes-container">
                <FontAwesomeIcon icon = {faHeart} 
                className = "heartIcon" 
                />
             <div className = "LikesNumber">{this.props.storyObj.likes}</div>
            </div>
            <div className = "ShowCommentsButon u-title-arvo" onClick = {this.displayComments}>Show comments</div>
            </div>
        </div>
    );}
        
    }
    
 }
 export default FullPost;