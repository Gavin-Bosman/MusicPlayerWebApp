const fs = require('fs');
const path = require('path');
const { MongoClient, Binary } = require('mongodb');

// Connection String

// const MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017';
// IPv4
const MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017';
const DATABASE_NAME = 'songDB';
const COLLECTION_NAME = 'songs';


// Read file, make into object, store in DB
async function storeSong(file_path, fileName) {
  fileName = fileName.replace(/\.mp3$/, "");
  const binData = new Binary(fs.readFileSync(file_path));

  // Use dynamic import to load the music-metadata library
  const METADATA = await import('music-metadata');

  // Store metadata as well
  const metadata = await METADATA.parseFile(file_path);

  const fileData = {
    fileName: fileName,
    data: binData,
    artist: metadata.common.artist,
    album: metadata.common.album,
    length: metadata.format.duration,
    albumCover: metadata.common.picture ? metadata.common.picture[0].data : null
  };

  // Create new client instance
  const client = new MongoClient(MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
  });

  try {
    // Try to connect to database
    await client.connect();
    // Traverse to collection
    const collection = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
    // Insert file into collection
    const res = await collection.insertOne(fileData);
    // Log successful insetion
    console.log(`Inserted file ${fileName} with id ${res.insertedId}`);
    
    // Error Handler
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

// Run process
function run() {
  const folder_path = 'songs';
  fs.readdir(folder_path, (err, files) => {
    if (err) {
      console.error('Error Reading Directory:', err);
      return;
    }

    files.forEach(file => {
      if (path.extname(file) === '.mp3') {
        const file_path = path.join(folder_path, file);
        storeSong(file_path, file);
      }
    });
  });
}

run();
