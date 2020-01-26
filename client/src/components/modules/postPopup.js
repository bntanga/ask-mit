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

        tags : [],
        value: "",
        addedTags: [],




    }
    }
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost(this.state.value, this.state.addedTags);
        //test case
        this.props.handleSubmit()
        this.state.addedTags = []
        this.setState({
          value: "",
        });
      };
    tagClick = (value) => {
        this.state.addedTags.push(value)


    }

    clickOffPopup = event => {
        this.props.handleSubmit();
        event.preventDefault(); 
        event.stopPropagation();
    }

    render(){

        let Tags = this.props.userTags.map((tagText)=>(

            <div className="tagButton" onClick={() => this.tagClick(tagText)}>

                {tagText}

            </div>


        ))

        return(
            <div className="PostPopup-layer" onClick={this.clickOffPopup}>
                <div className="popUpContainer" onClick={event => event.stopPropagation()}>

                    <textarea className="popUpInputfield"
                    type="text"
                    defaultValue= "Post Something"
                    placeholder="Whats your question?"
                    onChange={this.handleChange}
                    value= {this.state.value}
                    />
                    <span className="CheckBoxContainer u-title-arvo">
                            <input type="checkbox"/>
                            Submit Anonymously
                    </span>
                    <div className = "tagContainerText">Select tags:</div>
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




