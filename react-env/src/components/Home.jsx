import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Entry from './Entry';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thread: this.props.appState.threads[0],
    };

    console.log(this.props.appState.threads);

    this.threadClick = this.threadClick.bind(this);
  }

  threadClick(threadObj) {
    this.setState(threadObj);
  }

  render() {
    return (
      <div id="home">
        <List clickHandler={this.threadClick} threads={this.props.appState.threads} />
        <Entry
          username="hello world"
          thread={this.state.thread}
          refreshData={this.props.refreshData}
        />
      </div>
    );
  }
}


// ======================
// PROP TYPE VALIDATION
// ======================

Home.defaultProps = {
  appState: {
    isLoggedIn: false,
    authenticator: undefined,
    threads: [],
    user: undefined,
  },
  refreshData: () => {},
};

Home.propTypes = {
  appState: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    authenticator: PropTypes.func,
    threads: PropTypes.array,
    user: PropTypes.string,
  }),
  refreshData: PropTypes.func,
};

export default Home;
