import React, { Component } from "react";
import { Link } from "@reach/router";

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

    addTag=(tag) =>{
    
        this.props.addTag(tag);


    }

    removeTag=(tag)=>{
        this.props.removeTag(tag);


    }
    render(){
        // why is there an error here?
        let subscribedTags = this.props.subscribedTags
    .map((tag)=>
    <>
    <strong>{tag}</strong>
    <button onClick = {this.removeTag.bind(this,tag)}> change button to plus icon!</button>
    </>)
        // create function to actually have unsubscribed tags
        let unsubscribedTags = this.props.unsubscribedTags
        .map((tag)=>
        <>
        <strong >{tag}</strong>
        <button onClick = {this.addTag.bind(this,tag)}> change button to minus icon!</button>
        </>)
        return(
            <div>
                <h4>Manage your subscriptions</h4>
                <h5>current subscriptions</h5>
                {subscribedTags}
                <h5>Suggested subscriptions</h5>
                {unsubscribedTags}
            </div>
        )
       
    }
 }

 export default ManageSubs;