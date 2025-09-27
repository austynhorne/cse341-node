require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

const contactsRoute = require('./routes/contacts');
app.use('/api/contacts', contactsRoute);

db.connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
