import React, { Component } from "react";
import "./commentInput.css";

/**
 * @param {function} addComment
 */

class CommentInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
          };
    }
    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };
    handleSubmit = (event) => {
        if (this.state.value.length===0){alert("You cannot submit an empty comment"); return null}
        event.preventDefault();
        this.props.addComment(this.state.value);
        this.setState({
          value: "",
        });
      };

    render() {
        return (
          <div className = "Input-container">
            <textarea
              type="text"
              placeholder="What's your response?"
              onChange={this.handleChange}
              value = {this.state.value}
              className = "CommentInputBox"
            />
            <div className = "SubmitButton u-title-arvo"
              onClick={this.handleSubmit}
            >
              Submit
            </div>
          </div>
        );
      }

}

export default CommentInput;