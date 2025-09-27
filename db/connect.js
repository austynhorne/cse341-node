const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);

let _db;

module.exports = {
  connectToServer: async (callback) => {
    try {
      await client.connect();
      _db = client.db(process.env.DB_NAME);
      console.log('Connected to MongoDB');
      callback();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  },
  getDb: () => _db
};
