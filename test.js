const { MongoClient } = require('mongodb');

// const MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017';
const MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017';

const DATABASE_NAME = 'songDB';

async function testConnection() {
  const client = new MongoClient(MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB server');
    const db = client.db(DATABASE_NAME);
    const serverStatus = await db.command({ serverStatus: 1 });
    console.log('Server status:', serverStatus);
  } catch (err) {
    console.error('Error connecting to MongoDB server:', err);
  } finally {
    await client.close();
  }
}

testConnection();
