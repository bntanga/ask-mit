import React, { Component } from "react";
import "./homeSubBar.css";

/**
 * @param {array} subscribedTags for the user
 */

 class HomeSubBar extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        let tags = this.props.subscribedTags
                .map((tag)=> <div className = "Tag-container" onClick = {()=>this.props.handleFilter(tag)}>{tag}</div>)
        return (
            <div>{tags}</div>
        )
    }  
 }

export default HomeSubBar;