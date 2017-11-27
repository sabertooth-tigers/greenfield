/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    //  Expects username to be handed down from props
    //  Added flag to state that flips upon form submission
    this.state = {
      threadTitle: '1-line summary of your problem',
      threadDescription: 'Please provide more details here',
      isFormSubmitted: false,
    };

    this.submitThread = this.submitThread.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submitThread(e) {
    e.preventDefault();
    axios
      .post('/Threads', {
        creatorId: this.props.username._id.toString(),
        description: this.state.threadDescription,
        title: this.state.threadTitle,
      })
      .then(() => this.props.toggle())
      .then(() => {
        axios.get('/Threads')
          .then(({ data }) => this.props.clickThread({ thread: data[data.length - 1] }))
          .catch(err => console.error(err));
      });

    // .then(() => this.setState({ isFormSubmitted: true }, () => { this.props.refreshData(); }))
    // .then(() => this.props.toggle())
    // .catch(err => console.error(err));
  }
  //  One method that dynamically handles multiple input forms, depending on their name attribute
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //  Conditionally redirects to root route when form is submitted
  render() {
    if (this.state.isFormSubmitted) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div>
        Enter thread title.
        <input
          type="textarea"
          placeholder={this.state.threadTitle}
          name="threadTitle"
          onChange={this.handleInputChange}
        />
        <br />
        Enter thread description.
        <input
          type="textarea"
          placeholder={this.state.threadDescription}
          name="threadDescription"
          onChange={this.handleInputChange}
        />
        <br />
        <button type="submit" onClick={this.submitThread}>
            Create thread
        </button>

      </div>
    );
  }
}

CreateThread.propTypes = {
  username: PropTypes.string.isRequired,
  toggle: PropTypes.func,
  clickThread: PropTypes.func,
};

CreateThread.defaultProps = {
  toggle: () => {},
  clickThread: () => {},
};

export default CreateThread;
