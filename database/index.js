const mongoose = require('mongoose');
//  You might have to clear your original test db or change this to a new database
mongoose.connect('mongo://localhost/test');
const dbConnect = mongoose.connection;
dbConnect.on('error', console.error.bind('Connection error'));
dbConnect.once('open', () => {
  console.log('Successfully connected');
});

// const userSchema = mongoose.Schema({
//
// });
