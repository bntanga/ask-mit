import React, { Component } from "react";
import "./homeSubBar.css";
import  simmons from "./images/simmons1.jpg";
import  baker from "./images/baker.jpg";
import  business from "./images/business1.png";
import  academic from "./images/academic2.jpg";
import  classOf20 from "./images/classOf201.jpg";
import  classOf21 from "./images/classOf213.jpg";
import  classOf22 from "./images/classOf221.jpg";
import  classOf23 from "./images/classOf235.jpg";
import  clubs from "./images/clubs2.jpg";
import  eastCampus from "./images/eastCampus.jpg";
import  food from "./images/food4.jpg";
import  general from "./images/general2.jpg";
import  macgregor from "./images/macgregor.jpg";
import  mentalHealth from "./images/mentalHealth3.jpg";
import  newHouse from "./images/newHouse.jpg";
import  next from "./images/next.jpg";
import  other from "./images/other1.jpg";
import  random from "./images/random.jpg";
import  social from "./images/social1.jpg";
import  sports from "./images/sports.jpg";
import mcCormick from "./images/mccormick.jpg";
import burtonConner from "./images/burtonConner.jpg";


/**
 * @param {array} subscribedTags for the user
 */

const imageMap = {
    "Simmons Hall": simmons,
    "General": general,
    "Baker House": baker,
    "Academic": academic,
    "Social": social,
    "Business": business,
    "Mental Health": mentalHealth,
    "Food": food,
    "Clubs": clubs,
    "Sports": sports,
    "Other": other,
    "Class of 20": classOf20,
    "Class of 21": classOf21,
    "Class of 22": classOf22,
    "Class of 23": classOf23,
    "New House": newHouse,
    "MacGregor House": macgregor,
    "Random Hall": random,
    "East Campus": eastCampus,
    "McCormick Hall": mcCormick,
    "Next House": next,
    "Burton Conner": burtonConner,
  }
  let allTags22 =  ["General", "Academic", "Social", "Business",
  "Mental Health", "Food", "Clubs","Sports", "Other",
  "Class of 20", "Class of 21", "Class of 22", "Class of 23",
  "Simmons Hall", "Baker House", "New House", "MacGregor House", 
  "Random Hall", "East Campus", "McCormick Hall", "Next House", ]


 class HomeSubBar extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        let renderedTags = this.props.subscribedTags
        let tags = renderedTags
                .map((tag, i)=> <div 
                key={`Tag-${tag}`}
                onClick = {()=>this.props.handleFilter(tag)}
                className = {this.props.activeTag===tag? "Tag-containerActive":"Tag-container"}
                >
                    <img src = {imageMap[tag]} className="ImageTag"/>
                    {tag} <div></div>
                    </div>)
        return (
           
            
            <div className = "HomeSubBar-container u-title-arvo">
                <div className = "HomeSubBarText">Your Subscriptions</div>
                
                {tags}
            </div>
      
        )
    }  
 }

export default HomeSubBar;