import React, { Component } from "react";
import AStory from "./aQuestion";
import CommentsBlock from "./commentsBlock";
import "./fullPost.css";
import CommentInput from "./commentInput";
import { get, post, put } from "../../utilities.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';

/** receives 
 * @Param {object} storyObj
 * @param {string} userName 
 * 
 */

 

 class FullPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // test objects put in
            commentObjList : [],
            showComments : false,
            liked: false,
            questionLikes: this.props.storyObj.likes
        };
      }
    isLiked=()=>{
      if (this.state.liked){
          this.setState({liked: false,
          })
          this.state.questionLikes --
      } else {
          this.setState({liked:true,
              })
          this.state.questionLikes ++
          }
        console.log("question likes ",this.state.questionLikes)
      }
    onClick = () => { 
      this.isLiked();
      this.props.updateLikes(this.state.liked, this.props.storyObj._id)
        }
    displayComments=()=>{
          if (this.state.showComments){
            this.setState({showComments: false})
          }
          else{
            this.setState({showComments: true})
          }
    }
    getCurrentDate(){
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let mmm;
      switch(mm) {
      case "01":
      mmm = "Jan";
      break;
      case "02":
      mmm = "Feb";
      break;
      case "03":
      mmm = "Mar";
      break;
      case "04":
      mmm = "Apr"
      break;
      case "05":
      mmm = "May"
      break;
      case "06":
      mmm = Jun;
      break;
      case "07":
      mmm = Jul;
      break;
      case "08":
      mmm = "Aug";
      break;
      case "09":
      mmm = "Sep"
      break;
      case "10":
      mmm = "Oct";
      break;
      case "11":
      mmm = "Nov";
      break;
      case "12":
      mmm = "Dec"
      break;
      }

      today = mmm + ' ' + dd + ', ' + yyyy;
      return (today)
    }
    addComment = (commentContent) =>{
      let commentObj24 = {
        creatorName: this.props.userName,
        creatorId: this.props.creatorId,
        time: this.getCurrentDate(),
        content: commentContent,
        parentId: this.props.storyObj._id,
        likes: 0,
      }

      post("api/comments", commentObj24).then((comment)=>
      this.setState(
        {commentObjList: [comment].concat(this.state.commentObjList)})
      )
    }
    updateLikes= (isLiked, Id) =>{
      put("/api/commentlikes",{_id:Id, add:!isLiked}).then((comment)=>
      get("/api/comments",{parentId: comment.parentId}).then((comments)=>
      this.setState({commentObjList: comments.reverse()})));
    //       if (isLiked){
    //         //must return new comment obj
    //         put("api/commentlikes", {_id: Id, add: false})
    //  }else{
    //   put("api/commentlikes", {_id: Id, add: true})
    //  }
    }
    // componentDidUpdate() {
    //   get("/api/comments",{parentId: this.props.storyObj._id})
    //   .then((comments)=>{
    //     if (this.state.commentObjList !== comments) {
    //       this.setState({commentObjList: comments}) };
    //     })
        
    // }
    componentDidMount(){
      get("/api/comments",{parentId: this.props.storyObj._id})
      .then((comments)=>{ 
      let commentObjs = comments.reverse();
      this.setState({commentObjList: commentObjs}) });
    }
    render(){
      if(this.state.showComments){
        return(
          <div className = "fullPost-container">
                <AStory storyObj = {this.props.storyObj} postTags = {this.props.storyObj.postTags}/>
              <div className = "LikesCommentButton-container">
                <div className = "Likes-container">
                    <FontAwesomeIcon icon = {this.state.liked ? faHeartFilled : faHeart}
                    className = "heartIcon" 
                    onClick = {this.onClick}
                    />
                    <div className = "LikesNumber">{this.state.questionLikes}</div>
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
                <FontAwesomeIcon icon = {this.state.liked ? faHeartFilled : faHeart}
                className = "heartIcon" 
                onClick = {this.onClick}
                />
             <div className = "LikesNumber">{this.state.questionLikes}</div>
            </div>
            <div className = "ShowCommentsButon u-title-arvo" onClick = {this.displayComments}>Show comments</div>
            </div>
        </div>
    );}
        
    }
    
 }
 export default FullPost;