// ========================================
// SERVER AND DATABASE INITIALIZED
// ========================================

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

// ========================================
// AUTHENTICATION PACKAGES
// ========================================

const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
// const Promise = require('bluebird'); // Probably won't be dealing with any promises

const app = express();

app.use(express.static(`${__dirname}/../react-env/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =========================================
// AUTHENTICATION MIDDLEWARE
// =========================================

app.use(session({
  secret: 'dasdasdsadasd',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
}));

app.use(passport.initialize());
app.use(passport.session());

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

app.get('/email', (req, res) => {
  console.log(req.query.email);
  db.findUserPromise({ email: req.query.email })
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
});

// app.get('/Threads', (req, res) => {
//   console.log('Now processing get for Threads');
// });

// app.post('/Threads', (req, res) => {
//   console.log('Now processing post for Threads');
// });

// app.get('/Comments', (req, res) => {
//   console.log('Now processing get for Comments');
// });

// app.post('/Comments', (req, res) => {
//   console.log('Now processing post for Comments');
// });


app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw Error(err);
  }
// console.log(`server has started on ${process.env.PORT || 3000}`);
});
