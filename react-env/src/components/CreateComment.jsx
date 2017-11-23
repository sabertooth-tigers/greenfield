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

  //  TODO: modify post so that Entry re-renders newly created comment.
  sendComment() {
    axios
      .post('/Comments', {
        threadId: this.props.threadId,
        text: this.state.commentValue,
        username: this.props.username,
        date: Date.now(),
        vote: 0,
      })
      .then(() => this.setState({ commentValue: '' }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div id="CreateComment">
        <input type="text" value={this.state.commentValue} />
        <button onClick={this.sendComment} />
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
};

export default CreateComment;
