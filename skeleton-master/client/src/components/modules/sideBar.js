import React, { Component } from "react";
import { Link } from "@reach/router";

/**
 * @param {string} userName of profile owner
 */

class SideBar extends Component{
    constructor(props) {
        super(props);
      }
    render(){
        return(
        <div> 
            <h4>{this.props.userName}</h4>
        <Link to = "/profilepage1"> Questions asked </Link>
        <Link to = "/profilepage2"> Comments made </Link>
        <Link to = "/profilepage3">Subscriptions </Link>
        </div>
       );

        // implement login function
    }
}
export default SideBar;