// Backend API

const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, Binary, ObjectId } = require('mongodb');

// Add your MongoDB connection string
const MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'songDB';
const COLLECTION_NAME = 'songs';

// Middleware
app.use(cors());
app.use(express.json());

// Route to get all songs
app.get('/api/songs/name/:name', async (req, res) => {
    const name = req.params.name;
  
    try {
      const client = new MongoClient(MONGODB_CONNECTION_STRING, {
        useUnifiedTopology: true,
      });
      await client.connect();
      const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
      const song = await collection.findOne({ fileName: name });
  
      if (!song) {
        res.status(404).send('Song could not be found');
        return;
      }
  
      res.set('Content-Type', 'audio/mpeg');
      res.send(song.data.buffer);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
