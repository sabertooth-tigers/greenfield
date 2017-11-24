const db = require('./database/index.js');


const threads = [
  {
    creatorId: '1222321321',
    description: 'Overused by students, Hack Reactor decided to use dogs instead in Sprints',
    title: 'HR Bans Cats From Sprints',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122222321321',
    description: 'Getting thrown at 500 mph in the pirate ship',
    title: '[New Mascot] Guisak Johnson Price Calhoun',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122233321321',
    description: 'Fake news on why it\'s weak, check this out',
    title: 'Sleep Is For The Weak',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122442321321',
    description: 'Is league better than DOTA?',
    title: 'Pirateship Gamer Community Outrage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122255321321',
    description: 'Huge outrage',
    title: 'Pineapple On Pizza',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122266321321',
    description: 'Equator now makes more money off of WeWork community',
    title: 'WeWork Covfefe Shortage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122277321321',
    description: 'Somehow Allen got found out about it',
    title: 'Giraffe Police Arrests Allen',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122277321321',
    description: 'Check out the clutchness of this woman',
    title: 'Beth Johnson Saves Student From Sprint Death',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122277321321',
    description: 'Suddenly floors 2-4 have lines, a fix is required',
    title: 'WeWork Water Outage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
  {
    creatorId: '122277321321',
    description: 'There are angry employees who can\'t enjoy their friday night',
    title: 'Floor 2 Beer Outage',
    createdAt: '2017-11-22T03:30:26.037Z',
  },
];

threads.forEach(thread => db.saveThread(thread));
