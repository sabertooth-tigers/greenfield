var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../react-env/dist'));

app.listen(process.env.PORT || 3000, err => {
  if (err) {
    throw Error(err);
  }
  console.log(`server has started on ${process.env.PORT || 3000}`);
} )
