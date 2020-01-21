import React, { Component } from "react";
import { Link } from "@reach/router";
import "./manageSubs2.css"

/**
 * @param {array} subscribedTags user subscribes to
 * @param {array} allTags that exist in app
 * @param {function} addTag 
 * @param {function} removeTag
 * @param {function} unsubscribedTags
 */

 class ManageSubs extends Component{
    constructor(props) {
        super(props);
      }


    render(){
        let subscribedBlock = (this.props.subscribedTags
        .map((tag)=> <div onClick = {()=>this.props.removeSubscription(tag)} className = "Tag-container">{tag}</div>))
        let unsubBlock = (this.props.unsubscribedTags
        .map((tag)=><div onClick= {()=>this.props.addSubscription(tag)} className = "Tag-container">{tag}</div>))
        return(
            <div>
                <div>Manage your subscriptions</div>
                <div className = "TagBlock-container">
                Current Subscriptions 
                {subscribedBlock}
                Sugggested Subscriptions
                {unsubBlock}
                </div>
          </div>
        )
    }


    }
export default ManageSubs