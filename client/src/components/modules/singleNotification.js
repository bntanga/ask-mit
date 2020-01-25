import React, { Component } from "react";

class singleNotification extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
        <div className = "Notifications-container">
            <div className = "CommenterName">
                {this.props.notification.senderName} said:
            </div>
            <div className = "CommentContent">
                {this.props.notification.commentContent}
            </div>
            <div className = "QuestionAnswered">
                on your question: {this.props.notification.questionAnswered}
            </div>
        </div>

        )
    }

}

export default singleNotification;