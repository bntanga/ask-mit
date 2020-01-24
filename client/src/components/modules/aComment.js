import React, { Component } from "react";
import { Link } from "@reach/router";
import "./aComment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
/**
 * 
 * @param {object} commentObj obj
 */

class AComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            commentLikes: this.props.commentObj.likes
        }
      }
    isLiked=()=>{
        if (this.state.liked){
            this.setState({liked: false,
            })
            this.state.commentLikes --
        } else {
            this.setState({liked:true,
                })
            this.state.commentLikes ++
            }
        }
    onClick = () => { 
        this.isLiked();
        this.props.updateLikes(this.state.liked, this.props.commentObj._id)
    }
    render (){
        return (
        <div className = "Comment-container">
            <div className = "CommentNameTime-container">
                <div className = "Creator-name u-title-arvo">{this.props.commentObj.creatorName} |</div> 
                <div className = "CommentTime">{this.props.commentObj.time}</div>
             </div>
            <div className = "CommentContent">{this.props.commentObj.content}</div>
            <div className = "CommentLikes-container"> 
            {/* <FontAwesomeIcon icon = {faHeart} className = "heartIcon"/>  */}
            <FontAwesomeIcon icon = {faHeart} 
            className = "heartIcon" 
            onClick = {this.onClick}/>
             {/* onClick = {()=>{()=>this.props.updateLikes(this.state.liked, this.props.commentObj._id)};this.isLiked()}/> */}
             <div className = "LikesNumber"> {this.state.commentLikes}</div>
            </div>
        </div>)
        
    };
}


export default AComment;