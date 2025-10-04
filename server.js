require('dotenv').config();
const express = require('express');
const db = require('./db/connect');
const contactsRoute = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/contacts', contactsRoute);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

db.connectToServer(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
