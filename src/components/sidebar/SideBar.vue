<!-- Main Sidebar Component -->

<template>
  <nav class="sidebar" :class="{ sidebar__collapse: collapse }">
    <!-- Logo and Name -->
    <div class="brandbox d-flex">
      <div class="brandbox__logobox">
        <img class="brandbox__logobox_logo" src="../../assets/logo_white_stroke.svg" alt="Audiowave Logo" />
      </div>
      <h1 class="brandbox__name">
        Audio<span class="brandbox__name_span">wave</span>
      </h1>

      <!-- Expand/Collapse Button -->
      <button class="sidebar__button" :class="{ sidebar__button_position: collapse }" title="Collapse/Expand Sidebar"
        v-on:click="collapse = !collapse" @click="changeButtonText" style="opacity: 100% !important">
        {{ buttonText }}
      </button>
    </div>

    <!-- The Search Bar -->
    <form action="#" class="search">
      <input class="search__input" type="text" placeholder="Search for songs..." v-model="searchQuery" />
      <button class="search__button">
        <img class="search__button_icon" src="../../assets/search_icon.svg" alt="Search Icon" />
      </button>
    </form>

    <!-- Song list begins here -->
    <h2 class="sidebarOptions__header">
      <span class="sidebarOptions__header_1" v-on:click="optionSelected = !optionSelected, songIsSelected = true"
        :class="{ sidebarOptions__notSelected: optionSelected }">Songs</span>
      <span class="sidebarOptions__header_2" v-on:click="optionSelected = !optionSelected, songIsSelected = false"
        :class="{ sidebarOptions__selected: optionSelected }">Playlists</span>
    </h2>

    <!-- Scrollable div -->
    <div class="scrollableList">
      <!-- <SongItem songname="Enemy" artistname="Imagine Dragons" coverimageSrc="https://assets.3dtotal.com/arcane-imagine-dragons.edcsyl.jpg"/> -->
      <!-- <SongItem songname="SUFFICE" artistname="NF" :coverimageSrc="require('@/assets/NF-HOPE.png')"/> -->

      <!-- Fetch List of Songs from Database API -->
      <div v-if="songIsSelected">
         <SongItem @songPlayed="handleSongPlayed" v-for="song in filteredSongs" :key="song.id" :songname="song.fileName"
          :artistname="song.artist" :coverimageSrc="song.albumCover" />
      </div>

      <!-- List of Playlist Item(s) -->
      <div v-else>
        <PlaylistItem />
      </div>
    </div>
  </nav>
</template>

<script>

// import axios from 'axios';
import SongItem from "./SongItem";
import PlaylistItem from "./PlaylistItem.vue";

export default {
  name: "SideBar",
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SongItem,
    PlaylistItem
  },
  data() {
    return {
      // songs: [],
      // songURL: '',

      collapse: false, //Collapsed or Not
      buttonText: "<",

      optionSelected: false,
      songIsSelected: true,
      searchQuery: "",
    };
  },
  methods: {
    handleSongPlayed(song) {
      this.$emit("songPlayed", song);
    },
    changeButtonText() {
      if (this.buttonText === "<") {
        this.buttonText = ">";
      } else {
        this.buttonText = "<";
      }
    },
  },
  computed: {
    filteredSongs() {
      if (this.searchQuery) {
        return this.songs.filter((song) =>
          song.fileName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.songs;
      }
    },
  },


};
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/utilityClasses";
@import "../../sass/mediaquery-manager";

// General sidebar Styling (Scroll towards the end for useful classes used for sidebar function)
.sidebar {
  position: relative;
  top: 0;
  left: 0;
  height: 100vh;
  flex: 0 0 30%;
  opacity: 95%;
  background-color: rgba(24, 24, 24, 0.9);
  padding: 3.5rem 2.2rem;

  position: relative;
  z-index: 4 !important;
  transition: all 0.5s ease-out !important;

  @include respond(mediumScreen) {
    // Width < 1400 ?
    flex: 0 0 40%;
  }

  @include respond(tabletScreen) {
    // Width < 1000 ?
    flex: 0 0 95%;
  }

  &__button {
    font-family: sans-serif !important;
    font-size: 2rem;
    font-weight: 400;
    margin-left: auto;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: #c9c9c9;
    background-color: rgb(51, 51, 51);
    cursor: pointer;
    box-shadow: 0px 3px 7px 0px #00000041;
    // transform: translateX(7rem);
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: $color-grey-darker;
    }

    &:active {
      background-color: rgb(22, 22, 22);
    }
  }
}

// (Logo and Name) Styling
.brandbox {
  align-items: center;
  transition: all 0.3s ease-out;

  &__logobox {
    width: 5rem;
    height: 5rem;
    margin-right: 1.5rem;
    transition: all 0.3s ease-out;

    &_logo {
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-out;
    }
  }

  &__name {
    color: $color-white;
    font-size: 3rem;
    font-weight: 400;
    letter-spacing: 3px;
    transition: all 0.3s ease-out;

    &_span {
      color: $color-primary;
      transition: all 0.3s ease-out;
    }
  }
}

// Searchbar Styling
.search {
  display: flex;
  align-items: center;

  margin-top: 2rem;

  transition: all 0.3s ease-out;

  &__input {
    border: none;
    background-color: rgba(45, 45, 45, 0.9);
    padding: 1.8rem 2rem;
    width: 95%;
    border-radius: 5px;
    font-size: 1.5rem;
    font-weight: 400;
    color: rgb(199, 199, 199);
    transition: all 0.2s;
    margin-right: -4rem;

    &:focus {
      outline: none;
      width: 100%;
      color: $color-dark;
      background-color: $color-white;
    }

    &::placeholder {
      color: $color-grey-lighter;
    }

    &::-webkit-input-placeholder {
      color: $color-grey-lighter;
    }
  }

  &__button {
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:focus {
      outline: none;
    }

    &:active {}

    &_icon {
      width: 100%;
      height: 100%;
    }
  }
}

// Options (Song/Playlists)
.sidebarOptions__header {
  margin-top: 2rem;
  color: $color-white;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 1.5rem;
  border-bottom: 1px solid $color-grey-darker;
  transition: all 0.3s ease-out;

  &_1 {
    padding: 1rem 3rem;
    background-color: rgba(255, 255, 255, 0.09); // Is SELECTED by DEFAULT
    cursor: pointer;
    transition: all .3s ease-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  &_2 {
    padding: 1rem 3rem;
    background-color: rgba(255, 255, 255, 0); // When not selected
    cursor: pointer;
    transition: all .3s ease-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  // Dynamic classes for selected or not
  .sidebarOptions__selected {
    background-color: rgba(255, 255, 255, 0.09); // When selected
  }

  .sidebarOptions__notSelected {
    background-color: rgba(255, 255, 255, 0); // When NOT selected
  }
}

.scrollableList {
  position: relative;
  margin-top: 2rem;
  width: 100%;
  height: 65%;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: inset -4px 0px 10px 1px rgba(0, 0, 0, 0.055);
  transition: all 0.3s ease-out;
}

// Classes to help sidebar collapse/expand
.sidebar__collapse {
  flex: 0 0 0%;
  width: 0px !important;
  overflow: hidden;
  padding: 0px;

  &>*:not(:first-child) {
    opacity: 0;
  }
}

.sidebar__button_position {
  position: fixed;
  top: 0;
  left: 0;
  margin: 3rem;
  margin-right: 0px;
  margin-bottom: 0px;
}
</style>
