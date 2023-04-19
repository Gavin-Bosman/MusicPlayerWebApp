<!-- THIS IS THE MAIN VIEW/WINDOW -->

<template>
  <div class="main__window d-flex">
    <SideBar
      class="components"
      @songPlayed="playSong"
      @controlButtonPressed="controlButtonClicked"
      :songs="songs"
    />
    <div class="controlsContainer">
      <PlayerControls
        v-if="loadedSongs"
        class="components"
        :songURL="playingURL"
        :songName="songName"
        :artistName="artistName"
        :songLength="songLength"
        :coverArt="coverArt"
        :songs="songs"
        :currentIndex="currentIndex"
        @nextSong="playSong"
        @previousSong="playSong"
      />
    </div>
    <img
      class="backgroundImage"
      :src="`${this.coverArt}`"
      alt="BlurredCoverImage"
    />
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
      loadedSongs: true,
      currentIndex: 0,
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
        this.loadedSongs = true;
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
      this.currentIndex = this.songs.findIndex(
        (song) => song.fileName === this.songName
      );
      console.log(this.currentIndex);
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

@import "../sass/variables";
@import "../sass/animations";
@import "../sass/mediaquery-manager";

.main__window {
  min-width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  background-color: $color-primary;
  background: $color-dark;
  background: linear-gradient(
    0deg,
    rgb(24, 24, 24) 0%,
    rgb(37, 61, 57) 88%,
    rgb(50, 96, 89) 100%,
    rgb(58, 119, 110) 100%,
    rgb(68, 148, 136) 100%,
    rgb(95, 227, 207) 100%,
    rgb(105, 255, 232) 100%
  );
}

.backgroundImage {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 65%;
  background-size: cover;
  backface-visibility: hidden;
  filter: blur(20px);

  transform: scale(1);
  animation: background_image_animation 22s linear infinite;
  transition: all 0.4s;
}

.components {
  z-index: 3;
}

.controlsContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;
}

.components {
  z-index: 3;
}
</style>
