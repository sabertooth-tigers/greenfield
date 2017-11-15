const mongoose = require('mongoose');
//  You might have to clear your original test db or change this to a new database
mongoose.connect('mongo://localhost/test');
const dbConnect = mongoose.connection;
dbConnect.on('error', console.error.bind('Connection error'));
dbConnect.once('open', () => {
  console.log('Successfully connected');
});

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
