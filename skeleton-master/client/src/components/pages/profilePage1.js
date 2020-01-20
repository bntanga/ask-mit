import React, { Component } from "react";
import SideBar from "../modules/sideBar";
import QuestionsAsked from "../modules/questionsAsked";

/**pass in userobject
 * @param {string} userName of creator
 */

class ProfilePage1 extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
            <div>
                <SideBar userName = {this.props.userName}/>
                <QuestionsAsked />
            </div>
        )
    }
}

export default ProfilePage1;