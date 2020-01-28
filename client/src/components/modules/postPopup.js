import React,{Component} from "react";
import "./postPopup.css";

/**
 * @param {function} addPost
 * @param {array} allTags
 */
export default class PostPopup extends Component{

    constructor(props){

    super(props);
    this.state = {
        anonymous: false,

        tags : [],
        value: "",
        addedTags: [],
        tagClass: {0:"tagButton",
        1: "tagButton",
        2: "tagButton",
        3: "tagButton",
        4: "tagButton",
        5: "tagButton",
        6: "tagButton",
        7: "tagButton",
        8: "tagButton",
        9: "tagButton",
        10: "tagButton",
        11: "tagButton",
        12: "tagButton",
        13: "tagButton",
        14: "tagButton",
        15: "tagButton",
        16: "tagButton",
        17: "tagButton",     
        18: "tagButton",
        19: "tagButton",
        20: "tagButton",
        21: "tagButton",
        22: "tagButton",
        23: "tagButton",
        24: "tagButton",
        25: "tagButton",
        26: "tagButton",
        27: "tagButton",
        28: "tagButton",
        29: "tagButton",
        30: "tagButton",
        31: "tagButton",
        32: "tagButton",                           
                
                }

    }
    } 
    handleAnonymous=()=>{ 
        if (this.state.anonymous){
            this.setState({anonymous:false})
        }
        else {this.setState({anonymous:true})}
    }
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };
    handleSubmit = (event) => {
        if(this.state.addedTags.length===0){return null}
        event.preventDefault();
        this.props.addPost(this.state.value, this.state.addedTags, this.state.anonymous);
        //test case
        this.props.handleSubmit()
        this.state.addedTags = []
        this.setState({
          value: "",
        });
      };
    tagClick = (value, index ) => {
        if (this.state.addedTags.includes(value)){
            this.state.addedTags.splice(this.state.addedTags.indexOf(value), 1);
            this.state.tagClass[index] = "tagButton";
            this.setState({tagClass:this.state.tagClass })
        }
        else{
        this.state.addedTags.push(value)
        this.state.tagClass[index] = "tagButtonAlternate";
        this.setState({tagClass:this.state.tagClass })
        }


    }

    clickOffPopup = event => {
        this.props.handleSubmit();
        event.preventDefault(); 
        event.stopPropagation();
    }
 
    render(){

        let Tags = this.props.userTags.map((tagText,index)=>(
            // this.state.tagClass[index] = "tagButton";
            <div className={this.state.tagClass[index]} onClick={() => this.tagClick(tagText, index)}>

                {tagText}

            </div>


        ))

        return(
            <div className="PostPopup-layer" onClick={this.clickOffPopup}>
                <div className="popUpContainer" onClick={event => event.stopPropagation()}>

                    <textarea className="popUpInputfield"
                    type="text"
                    // defaultValue= "Post Something"
                    placeholder="Whats your question?"
                    onChange={this.handleChange}
                    value= {this.state.value}
                    />
                    <span className="CheckBoxContainer u-title-arvo">
                            <input type="checkbox"
                                    onChange = {this.handleAnonymous}
                                                />
                            Submit Anonymously
                    </span>
                    <div className = "tagContainerText">
                        <div className = "RequiredText">(Required)</div>Select tags:</div>
                    <div className="tagsContainer">
                        {Tags}

                    </div>


    
                        {/* <div className="submitPreferencesPrepend"> */}
                    

                        {/* </div> */}

                        <div className = "SubmitCancel-container">
                            
                            <div className = "CancelButton u-title-arvo"
                            onClick = {this.props.handleSubmit}>
                                Cancel
                            </div>
                            <div
                            onClick= {this.handleSubmit}
                            className="submitButton u-title-arvo"
                            >
                                Submit
                            </div>
                        </div>

                </div>
            </div>    





        )
    }





}




