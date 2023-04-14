// Backend API

const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

// Add your MongoDB connection string
const MONGODB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'songDB';
const COLLECTION_NAME = 'songs';

// Middleware
app.use(cors());
app.use(express.json());

// Route to get all songs
app.get('/api/songs', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_CONNECTION_STRING, {
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const songs = await collection.find().toArray();

    // Album covers are stored in binary form in the database
    // Need to convert them to base64 to be displayed in the sidebar
    res.json(songs.map(({ _id, fileName, artist, length, albumCover }) => ({ _id, fileName, artist, length, albumCover: albumCover ? 'data:image/jpeg;base64,' + Buffer.from(albumCover.buffer).toString('base64') : null
  })));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Route to get a song by id
app.get('/api/songs/id/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const client = new MongoClient(MONGODB_CONNECTION_STRING, {
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const song = await collection.findOne({ _id: ObjectId(id) });

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

// Route to get a song by name
app.get('/api/songs/name/:name', async (req, res) => {
  const name = req.params.fileName;

  try {
    const client = new MongoClient(MONGODB_CONNECTION_STRING, {
      useUnifiedTopology: true,
    });
    await client.connect();
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    const song = await collection.findOne({ name: name });

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