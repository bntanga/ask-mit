import React, { Component } from "react";
import "./manageSubsTest.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import plusIcon from "./images/add4.png";
import trashIcon from "./images/trash3.png";
import downArrow from "./images/arrow.png"; 
import upArrow from "./images/upArrow.png";

const ALL_DORMS = ["Simmons Hall", "Baker House", "New House", "MacGregor House", 
"Random Hall", "East Campus", "McCormick Hall", "Next House", "Burton Conner"];

const ALL_CLASS_YEARS = ["Class of 20", "Class of 21", "Class of 22", "Class of 23"];

const ALL_UNGROUPED = ["General", "Academic", "Social", "Business", "Mental Health", "Food", "Clubs", "Other"];

class ManageSubsTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dormsClass: "DropDownContentHide",
            classYearClass: "DropDownContentHide",
            // showDropDownDorms: false,
            // showDropDownClassYear: false,
            dorms :  ALL_DORMS,
            classYear : ALL_CLASS_YEARS,
            ungrouped : ALL_UNGROUPED
        }

      }

    showClassYears=()=>{
        if (this.state.classYearClass ==="DropDownContentHide"){this.setState({classYearClass:"DropDownContentShow  DropDown-container"})}
        else{this.setState({classYearClass:"DropDownContentHide"})};
    }
    showDorms=()=>{
        if (this.state.dormsClass ==="DropDownContentHide"){this.setState({dormsClass:"DropDownContentShow DropDown-container"})}
        else{this.setState({dormsClass:"DropDownContentHide"})};
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
            .map((tag)=> <div  className = "DropDownTags Tag-container1">
            {tag}
            <div className = "plusIcon" onClick = {()=>this.addSubscriptionDropDown(tag)}><img src = {plusIcon}/ ></div>
            </div>)
        )
        return(
            <div>
                <div className = "DropDown-button Tag-container1" >{name}
                <div className = "DropDownIcon"
                onClick = {this.showClassYears}> <img 
                src = {this.state.classYearClass==="DropDownContentHide"? downArrow:upArrow}/></div>
                </div>
                <div className = {this.state.classYearClass}>{dropDownTags}</div>
            </div>


        )

    }
    createDropDownDorms=(arr1, name)=>{
        let dropDownTags = (arr1
            .map((tag)=> <div  className = "DropDownTags Tag-container1">
                {tag} <div className = "plusIcon" onClick = {()=>this.addSubscriptionDropDown(tag)}><img src ={plusIcon}/></div></div>)
        )
        return(
            <div>
                <div className = "DropDown-button Tag-container1" >{name}
                <div 
                className = "DropDownIcon"
                onClick = {this.showDorms}>
                    <img 
                src = {this.state.dormsClass==="DropDownContentHide"? downArrow:upArrow}/></div>
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
            .map((tag)=> <div  className = "Tag-container1">
                {tag}
            <div className = "TrashIcon" onClick = {()=>this.removeSubscription(tag)}>
                <FontAwesomeIcon icon = {faTrashAlt}/></div></div>))
        let unsubBlock = (this.state.ungrouped
            .map((tag)=><div  className = "Tag-container1">
                {tag}<div className = "plusIcon" onClick= {()=>this.addSubscriptionDropDown(tag)}><img src = {plusIcon}/></div></div>))
        let dorms = this.createDropDownDorms(this.state.dorms,"Residence Halls")
        let classYear = this.createDropDownClassYear(this.state.classYear, "Class Year")

        return(
            <div className = "Full-container">
                {/* <div className = "ManageSubsText u-title-arvo">Manage your subscriptions</div>  */}
            <div className = "ManageSubs-container">
                <div className = "UnsubBlockAndText">
                    <div className = "IntroText u-title-arvo">Suggested Subscriptions</div>
                        <div className = "UnsubBlock">
                            {dorms} 
                            {classYear}
                            {unsubBlock}
                        </div>
                </div>
                <div className = "SubBlockAndText">
                    <div className = "IntroText u-title-arvo">Current Subscriptions</div>
                        <div className = "SubscribedBlock">
                        {subscribedBlock}
                        </div>
                </div>
                </div>
          </div>

        )



    }




}

export default ManageSubsTest;