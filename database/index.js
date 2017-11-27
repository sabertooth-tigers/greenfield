const mongoose = require('mongoose');

// this is a package that integrates passports essential functions for auth within
// the model.method object in a given schema

const passportLocalMongoose = require('passport-local-mongoose');

//  You might have to clear your original test db or change this to a new database
mongoose.connect('mongodb://localhost/test');
const dbConnect = mongoose.connection;
const Promise = require('bluebird');

dbConnect.on('error', console.error.bind('Connection error'));
dbConnect.once('open', () => {
  console.log('Successfully connected');
});

//  USERS defines what role a user should have.
const USERS = ['generalUser', 'moderator', 'admin'];
const userSchema = mongoose.Schema({
  // May not need unique
  role: { type: String, enum: USERS },
  username: String,
  password: String,
  salt: String,
  email: String,
});

userSchema.plugin(passportLocalMongoose);
/* eslint-disable */
const threadSchema = mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    description: String,
    title: String,
    createdAt: Date,
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  });

const commentSchema = mongoose.Schema(
{
  text: String,
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ThreadModel',
  },
  username: String,
  vote: { type: Number, default: 0 },
},
{
  timestamps: true,
});
/* eslint-enable */
//  constructor
exports.UserModel = mongoose.model('UserModel', userSchema);
const ThreadModel = mongoose.model('ThreadModel', threadSchema);
const CommentModel = mongoose.model('CommentModel', commentSchema);

// Do we need to return for save?
exports.saveUser = (user) => {
  const newUser = new exports.UserModel({
    role: user.role,
    username: user.username,
    password: user.password,
    salt: user.salt,
    email: user.email,
    userId: user.id,
  });

  newUser.save((err) => { if (err) return err; return true; });
};

exports.saveThread = (thread) => {
  const newThread = new ThreadModel(thread);

  newThread.save((err) => { if (err) return err; return true; });
};

exports.saveComment = (comment) => {
  const newComment = new CommentModel(comment);

  newComment.save((err) => { if (err) return err; return true; });
};

// .sort({'date': 'descending'})

exports.findUser = (query, callback) => {
  exports.UserModel.find(query, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
  // .limit(5)
};

exports.findUserPromise = Promise.promisify(exports.findUser);

exports.findThread = (query, callback) => {
  ThreadModel.find(query, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

exports.findThreadPromise = Promise.promisify(exports.findThread);

exports.findComments = (id, callback) => {
  CommentModel.find({ threadId: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

exports.findCommentsPromise = Promise.promisify(exports.findComments);

//  Can be refactored


// Search for thread, find thread by parameter
// Search for thread by ID
//  Find all comments relating to thread by threadID findAll ({id: ___})
