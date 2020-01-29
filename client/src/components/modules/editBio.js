import React, { Component } from "react";
import "./editBio.css";


class EditBio extends Component{
    constructor(props) {
        super(props);
        this.state={
            value:""
        }
      }
    
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editBio(this.state.value);
        //test case
        this.props.handleSubmit()
        this.setState({
          value: "",
        });
      };

    clickOffPopup = event => {
        this.props.handleSubmit();
        event.preventDefault(); 
        event.stopPropagation();
    }
 
    render(){

        return(
            <div className="PostPopup-layer1" onClick={this.clickOffPopup}>
                <div className="popUpContainer1" onClick={event => event.stopPropagation()}>

                    <textarea className="popUpInputfield1"
                    type="text"
                    placeholder="Type your new bio"
                    onChange={this.handleChange}
                    value= {this.state.value}
                    />


                        <div className = "SubmitCancel-container1">
                            
                            <div className = "CancelButton1 u-title-arvo"
                            onClick = {this.props.handleSubmit}>
                                Cancel
                            </div>
                            <div
                            onClick= {this.handleSubmit}
                            className="submitButton1 u-title-arvo"
                            >
                                Submit
                            </div>
                        </div>

                </div>
            </div>    





        )
    }



    }

export default EditBio;