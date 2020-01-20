import React, { Component } from "react";

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
        event.preventDefault();
        this.props.addComment(this.state.value);
        this.setState({
          value: "",
        });
      };

    render() {
        return (
          <div>
            <input
              type="text"
              placeholder="Whats your response?"
              onChange={this.handleChange}
              value = {this.state.value}
            />
            <button
              type="submit"
              value="Submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        );
      }

}

export default CommentInput;