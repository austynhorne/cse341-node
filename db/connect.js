const { MongoClient } = require('mongodb');

let db;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

module.exports = {
  connectToServer: async (callback) => {
    try {
      await client.connect();
      db = client.db(process.env.DB_NAME); 
      console.log('Connected to MongoDB');
      return callback();
    } catch (err) {
      console.error(err);
    }
  },
  getDb: () => db
};