import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  handleInputChange(e) {
    this.setState({ commentValue: e.target.value });
  }

  //  Re-renders the currently viewed thread upon comment submission.
  sendComment() {
    axios
      .post('/Comments', {
        threadId: this.props.threadId,
        text: this.state.commentValue,
        username: this.props.username,
      })
      .then(() => this.setState({ commentValue: '' }, () => { this.props.refreshComments(); }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div id="CreateComment">
        <input type="text" value={this.state.commentValue} onChange={this.handleInputChange} />
        <button onClick={this.sendComment}>Add Comment</button>
      </div>
    );
  }
}

// ================================
// PROP TYPE VALIDATION
// ================================

CreateComment.propTypes = {
  username: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  refreshComments: PropTypes.func.isRequired,
};

export default CreateComment;
