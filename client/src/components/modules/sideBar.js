import React, { Component } from "react";
import { Link } from "@reach/router";
import "./sideBar.css";
import { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import EditBio from "./editBio";

/**
 * @param {string} userName of profile owner
 */
const GOOGLE_CLIENT_ID = "628992577653-37tpc827fnafhcgbqur2rggvcnpa8jkn.apps.googleusercontent.com";

class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state={
            userName: "",
            userBio: "",
            showBio: false,

        }
    }

    editBioAndUpdate = (bio) => {
        this.props.editBio(bio).then(() => {
            get("/api/usernameandbio",{userId:this.props.userRouterId})
        .then((data)=>this.setState({userName:data.userName, userBio:data.userBio}));
        });
    }
 
    showBioFunc =()=>{
        if (this.state.showBio){this.setState({showBio:false})}
        else(this.setState({showBio:true}))
    }
    componentDidMount(){
        get("/api/usernameandbio",{userId:this.props.userRouterId})
        .then((data)=>this.setState({userName:data.userName, userBio:data.userBio}));
    }
    render(){
        if (this.props.userRouterId===this.props.userId){
        return( 
        <div className = "Sidebar-container u-title-arvo"> 
            <div className = "NameBio-container">
                <div className = "SideBarName ">{this.state.userName}</div>
                <div className = "UserBio1">{this.state.userBio}</div>
                <div 
                onClick = {this.showBioFunc}
                className = "EditBioButton">
                    Edit Bio</div>
                {this.state.showBio? <div className = "EditBioContainer"><EditBio 
                handleSubmit = {this.showBioFunc}
                editBio = {this.editBioAndUpdate}/></div>:null}
            </div>

            <div className = "u-title-arvo">
                <div className = "SideBarLink QuestionsAsked">
                    <Link to =  {`/profilepage1/${this.props.userId}`}
                    className = "u-title-arvo TextColor"> Questions asked </Link></div>
                <div className = "SideBarLink"><Link to = {`/profilepage3/${this.props.userRouterId}`} className = "u-title-arvo TextColor">Manage Subscriptions </Link></div>
                {/* <div className = "SideBarLink Logout"><Link to = "/profilepage3" className= "u-title-arvo TextColor">Logout </Link></div> */}
                <div className = "SideBarLink Logout">
                    <GoogleLogout 
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                    />
                </div>
            </div>
        </div>
       );}
       else return (

        <div className = "Sidebar-container u-title-arvo"> 
        <div className = "NameBio-container">
            <div className = "SideBarName ">{this.state.userName}</div>
            <div className = "UserBio">{this.state.userBio}</div>
        </div>
        <div className = "u-title-arvo">
            <div className = "SideBarLink QuestionsAsked"><Link to = {`/profilepage1/${this.props.userRouterId}`} className = "u-title-arvo TextColor"> Questions asked </Link></div>

        </div>
    </div>



       )

        // implement login function
    }
}
export default SideBar;