const mongoose = require('mongoose');
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

const threadSchema = mongoose.Schema({
  // May not need unique
  // threadId: { type: String, index: { unique: true } },
  creatorId: String,
  description: String,
  title: String,
  createdAt: Date,
});

const commentSchema = mongoose.Schema({
  // May not need unique
  text: String,
  threadId: String,
  userId: String,
  createdAt: Date,
  vote: Number,
});

//  constructor
const UserModel = mongoose.model('UserModel', userSchema);
const ThreadModel = mongoose.model('ThreadModel', threadSchema);
const CommentModel = mongoose.model('CommentModel', commentSchema);

// Do we need to return for save?
exports.saveUser = (user) => {
  const newUser = new UserModel({
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
  const newThread = new ThreadModel({
    threadId: thread.id,
    creatorId: thread.creator,
    description: thread.description,
    title: thread.title,
    createdAt: thread.date,
  });

  newThread.save((err) => { if (err) return err; return true; });
};

exports.saveComment = (comment) => {
  const newComment = new CommentModel({
    commentId: comment.id,
    text: comment.text,
    userId: comment.userId,
    createdAt: comment.date,
    vote: Number,
  });

  newComment.save((err) => { if (err) return err; return true; });
};

// .sort({'date': 'descending'})

exports.findUser = (query, callback) => {
  UserModel.find(query, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
  // .limit(5)
};

exports.findUserPromise = Promise.promisify(exports.findUser);

exports.findThread = (id, callback) => {
  ThreadModel.find({ _id: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

exports.findComments = (id, callback) => {
  CommentModel.find({ threadId: id }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

//  Can be refactored


// Search for thread, find thread by parameter
// Search for thread by ID
//  Find all comments relating to thread by threadID findAll ({id: ___})
