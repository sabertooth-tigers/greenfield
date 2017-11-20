// ========================================
// SERVER AND DATABASE INITIALIZED
// ========================================

const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use(express.static(`${__dirname}/../react-env/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ========================================
// AUTHENTICATION PACKAGES
// ========================================

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

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


passport.use(new LocalStrategy(db.UserModel.authenticate()));
passport.serializeUser(db.UserModel.serializeUser());
passport.deserializeUser(db.UserModel.deserializeUser());

// ========================================
// ROUTES
// ========================================
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




app.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

app.get('/login', (req, res) => {
  res.send(req.isAuthenticated());
});
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.isAuthenticated());

  res.end();
});

// app.get('/Users', (req, res) => {
//   console.log('Now processing get for Users');

// });

app.post('/Users', (req, res) => {
  const model = {
    role: 'generalUser',
    username: req.body.username,
    email: req.body.email,
  };


  db.UserModel.register(new db.UserModel(model), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    }
    passport.authenticate('local')(req, res, () => {
      console.log('you have registered and authenticated', user);
      res.end();
    });
  });
});

app.get('/email', (req, res) => {
  console.log(req.query.email);
  let emailExists = false;
  let userExists = false;

  db.findUserPromise({ email: req.query.email })
    .then((data) => {
      if (data.length > 0) {
        emailExists = true;
      }

      return db.findUserPromise({ username: req.query.username });
    })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        userExists = true;
      }

      res.json({
        email: emailExists,
        username: userExists,
      });
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
