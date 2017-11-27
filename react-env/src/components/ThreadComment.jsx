import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
//  Conforming to Airbnb linter here, combined with destructuring.

class ThreadComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: this.props.vote,
    };

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  upVote() {
    const vote = this.props.vote + 1;
    axios.patch('/vote', { method: 'upvote', commentId: this.props.id });

    this.setState({ votes: vote });
  }
  downVote() {
    const vote = this.props.vote - 1;
    axios.patch('/vote', { method: 'downvote', commentId: this.props.id });

    this.setState({ votes: vote });
  }
  render() {
    const {
      creator, createdAt, text,
    } = this.props;
    return (
      <div className="comment">
        <span className="comment-user">{creator} </span>
        <span onClick={this.upVote} className="fa fa-thumbs-up" aria-hidden="true" />
        <span> {this.state.votes} </span>
        <span onClick={this.downVote} className="fa fa-thumbs-down" aria-hidden="true" />
        <span className="comment-created">Created at:{moment(createdAt).fromNow()}</span>
        <div>{text}</div>
      </div>
    );
  }
}

ThreadComment.propTypes = {
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  vote: PropTypes.number,
  text: PropTypes.string,
  id: PropTypes.string,
};

//  These should never render because ViewThread prevents handling empty comment collections.
ThreadComment.defaultProps = {
  creator: 'Anonymous',
  createdAt: new Date(),
  vote: 0,
  text: 'This should not be rendered.',
  id: undefined,
};

export default ThreadComment;
