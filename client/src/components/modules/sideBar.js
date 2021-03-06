import React, { Component } from "react";
import { Link } from "@reach/router";
import "./sideBar.css";
import { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import EditBio from "./editBio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
/**
 * @param {string} userName of profile owner
 */
const GOOGLE_CLIENT_ID = "502384453504-5lqr5rmdtv8e6qou09m2atnj66grb31g.apps.googleusercontent.com";

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
                className = "EditBioButton"> <FontAwesomeIcon icon = {faEdit}/>
                    Edit Bio</div>
                {this.state.showBio? <div className = "EditBioContainer"><EditBio 
                handleSubmit = {this.showBioFunc}
                editBio = {this.editBioAndUpdate}/></div>:null}
            </div>

            <div className = "u-title-arvo">
                
                    <Link to =  {`/profilepage1/${this.props.userId}`}
                    className = "u-title-arvo TextColor SideBarLink QuestionsAsked"> Questions asked </Link>
                <Link to = {`/profilepage3/${this.props.userRouterId}`} className = "u-title-arvo TextColor SideBarLink">Manage Subscriptions </Link>
                {/* <div className = "SideBarLink Logout"> */}
                    <GoogleLogout 
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={this.props.handleLogout}
                    onFailure={(err) => console.log(err)}
                    render={(renderProps) => (
                        <button className="Skele-button2 SideBarLink u-pointer" onClick={renderProps.onClick}>
                          <span className="Skele-button-text2 u-title-arvo">Logout</span>
                        </button>
                      )}
                    />
                {/* </div> */}
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