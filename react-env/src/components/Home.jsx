import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Entry from './Entry';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.threadClick = this.threadClick.bind(this);

    this.state = {
      thread: undefined,
    };
  }

  threadClick(threadObj) {
    this.setState(threadObj);
  }

  render() {
    return (
      <div id="home">
        <List
          clickHandler={this.threadClick}
          username={this.props.appState.user}
          threads={this.props.appState.threads}
        />
        <Entry
          username={this.props.appState.user}
          thread={this.state.thread || this.props.appState.firstThread}
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
    firstThread: undefined,
    user: undefined,
  },
  refreshData: () => {},
};

Home.propTypes = {
  appState: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    authenticator: PropTypes.func,
    threads: PropTypes.array,
    firstThread: PropTypes.object,
    user: PropTypes.string,
  }),
  refreshData: PropTypes.func,
};

export default Home;
