import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    //  Expects ids to get passed down as props from parent components
    this.state = {
      commentValue: '',
      username: this.props.username,
      threadId: this.props.threadId,
      vote: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  handleInputChange(e) {
    this.setState({ commentValue: e.target.value });
  }

  //  I am assuming IDs get generated on the server...
  sendComment() {
    axios.post('/Comments', {
      threadId: this.state.threadId,
      text: this.state.commentValue,
      username: this.state.username,
      date: Date.now(),
      vote: this.state.vote,
    })
      .then(() => {
        this.setState({ commentValue: '' });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="Comment">
        <input type="text" value={this.state.commentValue} />
        <button onClick={this.sendComment} />
      </div>
    );
  }
}

export default Comment;
