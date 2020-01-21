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

        tags : ["Academics","Social","Technology","Business","Career","Sports"],
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

    render(){

        let Tags = this.props.userTags.map((tagText)=>(

            <div className="tagButtonContainer" onClick={() => this.tagClick(tagText)}>

                {tagText}

            </div>


        ))

        return(

            <div className={this.props.className}>

                {/* <span className="popUpContainerText">

                What is your question?

                </span> */}
                <input className="popUpInputfield"
                type="text"
                defaultValue= "Post Something"
                placeholder="Whats your question?"
                onChange={this.handleChange}
                value= {this.state.value}
                />

                <div className="tagsContainer">

                    {Tags}

                </div>

                <div className="submitPreferencesContainer">
 
                    <div className="submitPreferencesPrepend">
                    <input type="checkbox"/>

                    <span className="checkBoxTitle">
                        Submit Anonymously
                    </span>
                    </div>

                    <div
                    onClick= {this.handleSubmit}
                    className="submitButton"
                    >

                        Submit

                    </div>
                    {/* <button
                    className="submitButton"
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                    >
                    Submit
                    </button> */}


                </div>
            </div>
                





        )
    }





}




