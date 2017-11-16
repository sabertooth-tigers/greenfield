const mongoose = require('mongoose');
//  You might have to clear your original test db or change this to a new database
mongoose.connect('mongo://localhost/test');
const dbConnect = mongoose.connection;
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
  id: { type: String, index: { unique: true } },
});

const threadSchema = mongoose.Schema({
  // May not need unique
  id: { type: String, index: { unique: true } },
  creatorId: String,
  description: String,
  title: String,
  createdAt: Date,
  // Vote pushed off
});

const commentSchema = mongoose.Schema({
  // May not need unique
  id: { type: String, index: { unique: true } },
  text: String,
  userId: String,
  createdAt: Date,
  vote: Number,
});

//  constructor
const UserModel = mongoose.model('UserModel', userSchema);
const ThreadModel = mongoose.model('ThreadModel', threadSchema);
const CommentModel = mongoose.model('CommentModel', commentSchema);

// Do we need to return for save?
const saveUser = (user) => {
  const newUser = new UserModel({
    role: user.role,
    username: user.username,
    password: user.password,
    salt: user.salt,
    email: user.email,
    id: user.id,
  });

  newUser.save((err) => { if (err) return err; return true; });
};

const saveThread = (thread) => {
  const newThread = new ThreadModel({
    id: thread.id,
    creatorId: thread.creator,
    description: thread.description,
    title: thread.title,
    createdAt: thread.date,
  });

  newThread.save((err) => { if (err) return err; return true; });
};

const saveComment = (comment) => {
  const newComment = new CommentModel({
    id: comment.id,
    text: comment.text,
    userId: comment.userId,
    createdAt: comment.date,
    vote: Number,
  });

  newComment.save((err) => { if (err) return err; return true; });
};
