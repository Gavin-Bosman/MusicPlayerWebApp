<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  
  <!-- Main Window/Component -->
  <audio controls :src="songUrl" :volume="0.3"></audio>
  <li v-for="song in songs" :key="song._id" @click="fetchSong(song._id)">{{ song.fileName }}</li>
  
  
  <MainPlayer />
  
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            songs: [],
            songUrl: `http://localhost:5000/api/songs/name/TURN MY BACK.mp3`,
        };
  },
  methods: {
    async fetchSong(name) {
      name = "CAREFUL.mp3";
  this.songUrl = `http://localhost:5000/api/songs/name/${name}`;
  },
  },
  async created() {
      try {
          const response = await axios.get('http://localhost:5000/api/songs');
      this.songs = response.data;
    } catch (err) {
        console.error('Error fetching songs:', err);
    }
  },
};
</script>
