import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props

class ListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: undefined,
    };
    this.getUser();
  }

  getUser() {
    if (this.props.entry.creatorId) {
      axios.get(`/Users?id=${this.props.entry.creatorId}`)
        .then((res) => {
          if (res.data) {
            return this.setState({ username: res.data.username });
          }
          return 0;
        });
    }
  }
  render() {
    const { entry, onClickHandler } = this.props;

    return (
      <div className="thread-entry">
        {/* eslint-disable */}
        <div 
          onClick={() => onClickHandler({ thread: entry })}
          className="title"
        >
          {`${entry.title.slice(0, 21)}...`}
        </div>
        {/* eslint-enable */}
        <div> Author: {this.state.username || 'Anonymous'} </div>
        <div> Views: {entry.views} </div>
      </div>
    );
  }
}

// ========================
// PROP TYPE VALIDATION
// ========================

ListEntry.defaultProps = {
  entry: {
    title: undefined,
    creatorId: undefined,
  },
  onClickHandler: undefined,
};

ListEntry.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string,
    creatorId: PropTypes.string,
  }),
  onClickHandler: PropTypes.func,
};

export default ListEntry;
