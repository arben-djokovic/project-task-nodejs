const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE_STRING

let database;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connection() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    database = client.db('blog-posts');
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas", err);
    throw err;
  }
}

const getDb = () => {
  if (database) {
    return database;
  }
  throw { message: "Not connected to the database" };
}

module.exports = {
  connection,
  getDb
};
