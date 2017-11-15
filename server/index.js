const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../react-env/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  if (req.url !== '/') {
    res.writeHead(400, null);
    res.end();
  } else {
    db.fetch() // TODO --> will be whatever the database call it <--- TODO
      .then(results => res.json(results))
      .catch(err => console.log(err));
  }
  console.log('Now processing get from external source');
});

app.get('/Users', () => {
  console.log('Now processing get for Users');
});

app.post('/Users', () => {
  console.log('Now processing post for Users');
});

app.get('/Threads', () => {
  console.log('Now processing get for Threads');
});

app.post('/Threads', () => {
  console.log('Now processing post for Threads');
});


app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw Error(err);
  }
// console.log(`server has started on ${process.env.PORT || 3000}`);
});
