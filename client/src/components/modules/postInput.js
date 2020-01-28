import React, { Component } from "react";

/**
 * @param {function} addPost
 * @param {array} allTags
 */

class PostInput extends Component{
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
        this.props.addPost(this.state.value);
        this.setState({
          value: "",
        });
      };

    render() {
        return (
          <div>
            <input
              type="text"
              placeholder="Whats your question?"
              onChange={this.handleChange}
              value= {this.state.value}
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

export default PostInput;