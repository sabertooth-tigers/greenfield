import React from 'react';
import List from './List';


const Entry = () => (
  <div className="entry">
    This is the entry component
    <div>
        problems
    </div>
    <div>
      topics
    </div>
  </div>
);

const Home = (props) => (
  <div id="home">
    {console.log('hello world', props.state.threads)}
    <List threads={props.state.threads} />
    <Entry />
  </div>
);


export default Home;
