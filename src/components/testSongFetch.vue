<template>
  <!-- Main Window/Component -->
  <audio controls :src="songUrl" :volume="0.3"></audio>
  
  <MainPlayer />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      songs: [],
      songUrl: '',
    };
  },
  methods: {
    async getSongList() {
      try {
        const response = await axios.get('http://localhost:5000/api/songs');
        this.songs = response.data;
      } catch (error) {
        console.error("Error fetching song list", error);
      }
    },
    async fetchSong(name) {
      try {
        // console.log(name);
        // const response = await axios.get(`http://localhost:5000/api/songs/name/${name}`);
        this.songUrl = `http://localhost:5000/api/songs/name/Daylight.mp3`;
      } catch (error) {
        console.error("Error fetching song", error);
      }
    },
  },
  created() {
    this.getSongList();
  },
};
</script>
