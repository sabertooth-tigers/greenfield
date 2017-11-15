import React from 'react';

const List = () => (
  <div className="list">
  	This is the list component
  </div>
);

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

const Home = () => (
  <div id="home">
    <List />
    <Entry />
  </div>
);


export default Home;
