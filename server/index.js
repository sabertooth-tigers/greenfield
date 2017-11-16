
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const bcrypt = require('bcryptjs');
// const Promise = require('bluebird'); // Probably won't be dealing with any promises

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

app.get('/Users', (req, res) => {
  console.log('Now processing get for Users');
});

app.post('/Users', (req, res) => {
  console.log('Now processing post for Users');
  const generatedSalt = bcrypt.genSaltSync(10);

  bcrypt.hash(req.body.password, generatedSalt)
    .then((hash) => {
      const model = {
        role: 'generalUser',
        username: req.body.username,
        password: hash,
        salt: generatedSalt,
        email: req.body.email,
      };


      db.saveUser(model);
      res.end();
    });
});

app.get('/Threads', (req, res) => {
  console.log('Now processing get for Threads');
});

app.post('/Threads', (req, res) => {
  console.log('Now processing post for Threads');
});

app.get('/Comments', (req, res) => {
  console.log('Now processing get for Comments');
});

app.post('/Comments', (req, res) => {
  console.log('Now processing post for Comments');
});


app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw Error(err);
  }
// console.log(`server has started on ${process.env.PORT || 3000}`);
});
