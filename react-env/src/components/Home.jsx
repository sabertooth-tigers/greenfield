import React from 'react';
import Entry from './Entry';

const List = () => (
  <div className="list">
    This is the list component
  </div>
);

const Home = () => (
  <div id="home">
    <List />
    <Entry />
  </div>
);


export default Home;
