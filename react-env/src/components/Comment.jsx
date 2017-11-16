import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    
    //Expects ids to get passed down as props from parent components
    this.state = {
      commentValue: '',
      userId: this.props.userId,
      threadId: this.props.threadId,
      vote: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  handleInputChange(e) {
    this.setState({commentValue: e.target.value});
  }

  //I am assuming IDs get generated on the server...
  sendComment(e) {
    $.post('/Threads', {
      threadId: this.state.threadId,
      text: this.state.commentValue,
      userId: this.state.userId,
      createdAt: Date.now(),
      vote: this.state.vote
    })
    .done(() => {
      this.setState({commentValue: ''});
    });
  }

  render() {
    return (
      <input type='text' value={this.state.commentValue} />
      <button onClick={this.sendComment}/>
    );
  }
}