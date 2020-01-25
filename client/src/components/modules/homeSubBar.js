import React, { Component } from "react";
import "./homeSubBar.css";

/**
 * @param {array} subscribedTags for the user
 */

let test = ["Academics", "Social", "Athletics", "Business", "Dorm life", "Mental health", "Clubs"]


 class HomeSubBar extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        let tags = this.props.subscribedTags
                .map((tag)=> <div className = "Tag-container" onClick = {()=>this.props.handleFilter(tag)}>{tag}</div>)
        return (
            <div className = "HomeSubBar-container u-title-arvo">
                <div className = "HomeSubBarText">Filter by:</div>
                {tags}
            </div>
        )
    }  
 }

export default HomeSubBar;