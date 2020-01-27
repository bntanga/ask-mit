import React, { Component } from "react";
import ManageSubsTest from "../modules/manageSubsTest.js";

class InitialLogin extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div>
                <ManageSubsTest
                subscribedTags = {this.props.subscribedTags}
                addSubscription = {this.props.addSubscription}
                removeSubscription = {this.props.removeSubscription}
                unsubscribedTags = {this.props.unsubscribedTags}
                />
            </div>






        )
    }
}
export default InitialLogin;
