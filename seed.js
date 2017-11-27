const db = require('./database/index.js');


const threads = [
  {
    description: 'Overused by students, Hack Reactor decided to use dogs instead in Sprints',
    title: 'HR Bans Cats From Sprints',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Getting thrown at 500 mph in the pirate ship',
    title: '[New Mascot] Guisak Johnson Price Calhoun',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Fake news on why it\'s weak, check this out',
    title: 'Sleep Is For The Weak',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Is league better than DOTA?',
    title: 'Pirateship Gamer Community Outrage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Huge outrage',
    title: 'Pineapple On Pizza',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Equator now makes more money off of WeWork community',
    title: 'WeWork Covfefe Shortage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Somehow Allen got found out about it',
    title: 'Giraffe Police Arrests Allen',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Check out the clutchness of this woman',
    title: 'Beth Johnson Saves Student From Sprint Death',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'Suddenly floors 2-4 have lines, a fix is required',
    title: 'WeWork Water Outage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    description: 'There are angry employees who can\'t enjoy their friday night',
    title: 'Floor 2 Beer Outage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
];

threads.forEach(thread => db.saveThread(thread));
