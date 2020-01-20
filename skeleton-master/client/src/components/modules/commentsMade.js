import React, { Component } from "react";
import FullPost from "./fullPost";

/**
 * @param {number} userId of post creator
 */

let testStoryObj1 = {
    creatorName: "John Doe",
    time: Date.now(),
    content: "test story",
    likes: 10,
    postTags: ["Academics"]
  }
  let testStoryObj2 = {
    creatorName: "John Cena",
    time: Date.now(),
    content: "test story 2",
    likes: 15,
    postTags: ["Social", "Parties"]

  }
class QuestionsAsked extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ListOfStoryObj : [testStoryObj2, testStoryObj1],
        }
      }

    render(){
        let feed = this.state.ListOfStoryObj
        .map((storyObj1)=> 
        <FullPost storyObj = {storyObj1}/>
        );
        return (
        <div>
        {feed}
        </div>
            );
};

}

export default QuestionsAsked;