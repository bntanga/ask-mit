import React, { Component } from "react";
import "./manageSubsTest.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const ALL_DORMS = ["Simmons Hall", "Baker House", "New House", "MacGregor House", 
"Random Hall", "East Campus", "McCormick Hall", "Next House", "Burton Conner"];

const ALL_CLASS_YEARS = ["Class of 20", "Class of 21", "Class of 22", "Class of 23"];

const ALL_UNGROUPED = ["General", "Academic", "Social", "Business", "Mental Health", "Food", "Clubs","Sports", "Other"];

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
        if (this.state.classYearClass ==="DropDownContentHide"){this.setState({classYearClass:"DropDownContentShow"})}
        else{this.setState({classYearClass:"DropDownContentHide"})};
    }
    showDorms=()=>{
        if (this.state.dormsClass ==="DropDownContentHide"){this.setState({dormsClass:"DropDownContentShow"})}
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
            .map((tag)=> <div onClick = {()=>this.addSubscriptionDropDown(tag)} className = "DropDownTags Tag-container">
                {tag}<div className = "MinusIcon"><FontAwesomeIcon icon = {faTimes}/></div></div>)
        )
        return(
            <div className = "DropDown-container">
                <div className = "DropDown-button Tag-container" onClick = {this.showClassYears}>{name}</div>
                <div className = {this.state.classYearClass}>{dropDownTags}</div>
            </div>


        )

    }
    createDropDownDorms=(arr1, name)=>{
        let dropDownTags = (arr1
            .map((tag)=> <div onClick = {()=>this.addSubscriptionDropDown(tag)} className = "DropDownTags Tag-container">
                {tag} <div className = "MinusIcon"><FontAwesomeIcon icon = {faTimes}/></div></div>)
        )
        return(
            <div className = "DropDown-container">
                <div className = "DropDown-button Tag-container" onClick = {this.showDorms}>{name}</div>
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
            .map((tag)=> <div onClick = {()=>this.removeSubscription(tag)} className = "Tag-container">{tag}</div>))
        let unsubBlock = (this.state.ungrouped
            .map((tag)=><div onClick= {()=>this.addSubscriptionDropDown(tag)} className = "Tag-container">
                {tag}<div className = "MinusIcon"><FontAwesomeIcon icon = {faTimes}/></div></div>))
        let dorms = this.createDropDownDorms(this.state.dorms,"Residence Halls")
        let classYear = this.createDropDownClassYear(this.state.classYear, "Class Year")

        return(
            <div className = "Full-container">
                <div className = "ManageSubsText u-title-arvo">Manage your subscriptions</div> 
            <div className = "ManageSubs-container">
                <div className = "SubscribedBlock">
                    <div className = "IntroText u-title-arvo">Current Subscriptions</div>
                    {subscribedBlock}
                  </div>
                <div className = "UnsubBlock">
                <div className = "IntroText u-title-arvo">Suggested Subscriptions</div>
                    {dorms}
                    {classYear}
                    {unsubBlock}
                </div>
                </div>
          </div>

        )



    }




}

export default ManageSubsTest;