<!-- THIS IS THE MAIN VIEW/WINDOW -->

<template>
  <div class="main__window d-flex">
    <SideBar
      class="components"
      @songPlayed="playSong"
      @controlButtonPressed="controlButtonClicked"
      :songs="songs"
    />
    <PlayerControls
      class="components"
      :songURL="playingURL"
      :songName="songName"
      :artistName="artistName"
      :songLength="songLength"
      :coverArt="coverArt"
    />
    <img class="backgroundImage" :src="`${this.coverArt}`" alt="" />
  </div>
</template>

<script>
import SideBar from "./sidebar/SideBar";
import PlayerControls from "./player/PlayerControls";
// import testSongFetch from './testSongFetch';
import axios from "axios";

export default {
  name: "MainPlayer",
  components: {
    SideBar,
    PlayerControls,
    // testSongFetch
  },
  data() {
    return {
      songs: [],
      songID: "",
      songName: "",
      artistName: "",
      coverArt: "",
      songLength: "",
      songURL: "",
      playingURL: "",
    };
  },
  methods: {
    // Methods For Fetching Songs
    async getSongList() {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        this.songs = response.data;
      } catch (error) {
        console.error("Error fetching song list", error);
      }
    },
    async fetchSong(name) {
      try {
        console.log(name);
        const response = await axios.get(
          `http://localhost:5000/api/songs/fileName/${name}`
        );
        this.songURL = `http://localhost:5000/api/songs/fileName/${name}`;
        this.songID = response.data.id;
        this.songName = response.data.name;
        this.artistName = response.data.artist;
        this.songLength = response.data.length;
        this.coverArt = response.data.albumCover;
        // console.log(this.songName, this.songURL, this.artistName, this.coverArt);
      } catch (error) {
        console.error("Error fetching song", error);
      }
    },
    async playSong(song) {
      await this.fetchSong(song);
      if (this.songID) {
        this.playingURL = `http://localhost:5000/api/songs/id/${this.songID}`;
      } else {
        console.error("Error: songID is empty");
      }
      // console.log(this.song, this.songURL, this.artistName, this.coverArt);
    },
  },
  // Create Lifecycle Method
  created() {
    this.getSongList();
  },
};
</script>

<style lang="scss">
@import "../sass/variables";

.main__window {
  min-width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  background-color: $color-primary;
  background: $color-dark;
  /* background: linear-gradient(0deg, rgb(24, 24, 24) 0%, rgb(37, 61, 57) 88%, rgb(50, 96, 89) 100%, rgb(58, 119, 110) 100%, rgb(68, 148, 136) 100%, rgb(95, 227, 207) 100%, rgb(105, 255, 232) 100%); */
}

.backgroundImage {
  position: absolute;
  z-index: 1;
  transform: translate(15%, 0%);
  width: 100%;
  height: 100%;
  object-fit: cover;

  opacity: 65%;
  background-size: cover;
  filter: blur(106px);
}

.components {
  z-index: 3;
}
</style>
