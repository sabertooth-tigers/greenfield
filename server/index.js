const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../react-env/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    throw Error(err);
  }
//  console.log(`server has started on ${process.env.PORT || 3000}`);
});
