import React, { Component } from "react";
import "./tagsBlock.css";

/**
 * @param {Array} postTags 
 */

class TagsBlock extends Component{
    constructor(props) {
        super(props);
      };
    render(){
        let tagBar = this.props.postTags.map((tag)=> <div className = "u-inlineBlock u-title-arvo TagBar" key={`Tag-${tag}`}>  {tag} </div>)
        return(
           <div>{tagBar}</div>
        )
    };
};

export default TagsBlock;