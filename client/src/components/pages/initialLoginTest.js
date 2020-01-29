import React, { Component } from "react";
import "./initialLoginTest.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import plusIcon from "../modules/images/add4.png";
import trashIcon from "../modules/images/trash3.png";
import downArrow from "../modules/images/arrow.png";
import upArrow from "../modules/images/upArrow.png";

const ALL_DORMS = ["Simmons Hall", "Baker House", "New House", "MacGregor House", 
"Random Hall", "East Campus", "McCormick Hall", "Next House", "Burton Conner"];

const ALL_CLASS_YEARS = ["Class of 20", "Class of 21", "Class of 22", "Class of 23"];

const ALL_UNGROUPED = ["General", "Academic", "Social", "Business", "Mental Health", "Food", "Clubs", "Other"];

class InitialLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dormsClass: "DropDownContentHide1",
            classYearClass: "DropDownContentHide1",
            // showDropDownDorms: false,
            // showDropDownClassYear: false,
            dorms :  ALL_DORMS,
            classYear : ALL_CLASS_YEARS,
            ungrouped : ALL_UNGROUPED
        }

      }

    showClassYears=()=>{
        if (this.state.classYearClass ==="DropDownContentHide1"){this.setState({classYearClass:"DropDownContentShow1  DropDown-container1"})}
        else{this.setState({classYearClass:"DropDownContentHide1"})};
    }
    showDorms=()=>{
        if (this.state.dormsClass ==="DropDownContentHide1"){this.setState({dormsClass:"DropDownContentShow1 DropDown-container1"})}
        else{this.setState({dormsClass:"DropDownContentHide1"})};
    }

    getUnsubTags=(arr1, arr2)=>{
        let difference = arr1.filter(x => !arr2.includes(x));
        return difference;
    };
    getAllUnsub=()=>{
        let dorms2 = this.getUnsubTags(ALL_DORMS, this.props.subscribedTags)
        let classYear2 = this.getUnsubTags(ALL_CLASS_YEARS, this.props.subscribedTags)
        let ungrouped2 = this.getUnsubTags(ALL_UNGROUPED, this.props.subscribedTags)
        this.setState({
            dorms: dorms2,
            classYear: classYear2,
            ungrouped: ungrouped2,
        })
    }
    addSubscriptionDropDown=(tag)=>{
        this.getAllUnsub()
        this.props.addSubscription(tag)

    }

    removeSubscription = (tag) => {
        this.props.removeSubscription(tag, this.getAllUnsub);
    }
    createDropDownClassYear=(arr1, name)=>{
        let dropDownTags = (arr1
            .map((tag)=> <div  className = "DropDownTags1 Tag-container2">
            {tag}
            <div className = "plusIcon1" onClick = {()=>this.addSubscriptionDropDown(tag)}><img src = {plusIcon}/ ></div>
            </div>)
        )
        return(
            <div>
                <div className = "DropDown-button1 Tag-container2" >{name}
                <div className = "DropDownIcon1"
                onClick = {this.showClassYears}> <img 
                src = {this.state.classYearClass==="DropDownContentHide1"? downArrow:upArrow}/></div>
                </div>
                <div className = {this.state.classYearClass}>{dropDownTags}</div>
            </div>


        )

    }
    createDropDownDorms=(arr1, name)=>{
        let dropDownTags = (arr1
            .map((tag)=> <div  className = "DropDownTags1 Tag-container2">
                {tag} <div className = "plusIcon1" onClick = {()=>this.addSubscriptionDropDown(tag)}><img src ={plusIcon}/></div></div>)
        )
        return(
            <div>
                <div className = "DropDown-button1 Tag-container2" >{name}
                <div 
                className = "DropDownIcon1"
                onClick = {this.showDorms}>
                    <img 
                src = {this.state.dormsClass==="DropDownContentHide1"? downArrow:upArrow}/></div>
                </div>
                <div className = {this.state.dormsClass}>{dropDownTags}</div>
            </div>


        )

    }
    componentDidMount(){
        this.getAllUnsub()
    };
    componentDidUpdate(prevProps, prevState){ 
        if (prevProps.subscribedTags!==this.props.subscribedTags){
        this.getAllUnsub()};
        // if(prevState!==this.state){
        //     this.getAllUnsub()
        // };
    //     if(prevProps.subscribedTags!==this.props.subscribedTags){
    //         this.getAllUnsub()
    //     }
    };
        

    render(){

        let subscribedBlock = (this.props.subscribedTags
            .map((tag)=> <div  className = "Tag-container2">
                {tag}
            <div className = "TrashIcon1" onClick = {()=>this.removeSubscription(tag)}><FontAwesomeIcon icon = {faTrashAlt}/></div></div>))
        let unsubBlock = (this.state.ungrouped
            .map((tag)=><div  className = "Tag-container2">
                {tag}<div className = "plusIcon1" onClick= {()=>this.addSubscriptionDropDown(tag)}><img src = {plusIcon}/></div></div>))
        let dorms = this.createDropDownDorms(this.state.dorms,"Residence Halls")
        let classYear = this.createDropDownClassYear(this.state.classYear, "Class Year")

        return(
            <div className = "Full-container1">
                    <div className = "WelcomeText1 u-title-arvo">Welcome to askMIT!</div>
                <div className = "TextAndManageSubsContainer">
                    <div className = "ExplanationText u-title-arvo">Select your subscriptions.
                    You will only see questions related to what you subscribe to.</div>
            <div className = "ManageSubs-container1">
                <div className = "UnsubBlockAndText1">
                    <div className = "IntroText1 u-title-arvo">Suggested Subscriptions</div>
                        <div className = "UnsubBlock1">
                            {dorms} 
                            {classYear}
                            {unsubBlock}
                        </div>
                </div>
                <div className = "SubBlockAndText1">
                    <div className = "IntroText1 u-title-arvo">Current Subscriptions</div>
                        <div className = "SubscribedBlock1">
                        {subscribedBlock}
                        </div>
                </div>
                </div>
                </div>
          </div>

        )



    }




}

export default InitialLogin;