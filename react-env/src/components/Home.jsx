import React from 'react';
import List from './List';
import Entry from './Entry';


const Home = (props) => (
  <div id="home">
    {console.log('hello world', props.state.threads)}
    <List threads={props.state.threads} />
    <Entry username="hello world" thread={props.state.threads[0]} />
  </div>
);


export default Home;
