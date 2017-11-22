import React from 'react';
import List from './List';
import Entry from './Entry';


const Home = () => (
  <div id="home">
    {console.log('hello world', props.state.threads)}
    <List threads={props.state.threads} />
    <Entry />
  </div>
);


export default Home;
