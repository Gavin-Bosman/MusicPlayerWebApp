// <!-- THIS IS THE MAIN VIEW/WINDOW -->

<template>
    <div class="main__window d-flex">
      <SideBar :songs="songs" />
      <!-- <testSongFetch/> -->
      <PlayerControls />
    </div>
</template>



<script>

import SideBar from './sidebar/SideBar';
import PlayerControls from './player/PlayerControls';
// import testSongFetch from './testSongFetch.vue';
import axios from 'axios';


export default {
  name: 'MainPlayer',
  components: {
    SideBar,
    PlayerControls,
    // testSongFetch
  },
  data() {
    return {
      songs: [],
      songURL: '',
    }
  },
  methods: {
    // Methods For Fetching Songs
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
        console.log(name);
        const response = await axios.get(`http://localhost:5000/api/songs/name/${name}`);
        this.songUrl = response.data.url;
      } catch (error) {
        console.error("Error fetching song", error);
      }
    },
  },
  // Create Lifecycle Method
  created() {
    this.getSongList();
  },
}
</script>



<style lang="scss">

    @import "../sass/variables";

    .main__window {
        min-width: 100vw;
        min-height: 100vh;
        background-color: $color-primary;
        background: $color-dark;
        background: linear-gradient(0deg, rgb(24, 24, 24) 0%, rgb(37, 61, 57) 88%, rgb(50, 96, 89) 100%, rgb(58, 119, 110) 100%, rgb(68, 148, 136) 100%, rgb(95, 227, 207) 100%, rgb(105, 255, 232) 100%);
    }

</style>