import React, { Component } from "react";
import "./singleNotification.css";

class singleNotification extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
        <div className = "Notification-container u-title-arvo">
            <div className = "FlexItem1">
                <div>
                    <div className = "CommenterName">
                    {this.props.notification.senderName}</div>
                    <div className = "FillerWord1"> responded:</div>
                </div>
                    <div className = "Time">{this.props.notification.commentTime}</div>
                
            </div>
            <div className = "CommentContent1 FlexItem">
                {this.props.notification.commentContent}
            </div>
            <div className = "FillerWord2   FlexItem">To your question:</div>
            <div className = "QuestionAnswered FlexItem">
                 {this.props.notification.questionAnswered}
            </div>
        </div>

        )
    }

}

export default singleNotification;