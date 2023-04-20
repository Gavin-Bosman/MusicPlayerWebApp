<template>
    <div class="playlistitem">
        <!-- Image -->
        <figure class="playlistitem__coverbox">
            <img id="albumCover" class="playlistitem__coverbox_coverimage" src="../../assets/default_playlist_image.png" alt="Playlist Image">
        </figure>
        
        <!-- Playlist Name -->
        <div class="playlistitem__details">
            <h3 class="playlistitem__details_playlistname">Lofi Hiphop</h3>
        </div>

        <!-- Play/Pause Button -->
        <button class="playlistitem__button" title="View Songs" :class="{playlistButton:playlistCollapsed}" v-on:click="playlistCollapsed=!playlistCollapsed">
            <img class="playlistitem__button_icon" src="../../assets/play_icon.svg" alt="Play/Pause Icon" :class="{playlistButton__icon:playlistCollapsed}">
        </button>
    </div>

    <div class="playlistitem__songscontainer" v-if="!playlistCollapsed">
        <SongItem />
    </div>
    
</template>

<script>

import SongItem from "./SongItem";

export default {
    name: 'PlaylistItem',
    props: {

    },

    components: {
        SongItem
    },

    data() {
        return {
            playlistCollapsed: true
        };
    },

    methods: {

    },
}
</script>

<style lang="scss">

    @import "../../sass/variables";
    @import "../../sass/utilityClasses";
    @import "../../sass/mediaquery-manager";

    .playlistitem {

        background-color: rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        padding: 1rem;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: rgba(0, 0, 0, 0.30);
        }

        &__coverbox {

            width: 7rem;
            height: 7rem;
            border-radius: 5px;
            overflow: hidden;
            object-fit: cover;
            display: flex;
            justify-content: center;
            

            &_coverimage {
                backface-visibility: hidden;
            }
        }


        &__details {

            width: 60%;
            display: flex;
            flex-direction: column;
            margin-left: 1.5rem;
            color: $color-white;
            font-size: 1.5rem;
            line-height: normal;
            
            &_playlistname {
                font-weight: 400;
            }
        }


        &__button {

            margin-left: auto;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: rgb(215, 215, 215);
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: rgb(198, 198, 198) !important;
            }
            &:active {
                background-color: rgb(170, 170, 170);
            }

            &_icon {
                transform: rotate(90deg);
                width: 35%;
                transition: all 0.1s ease-in-out;
            }
        }
        // Dynamic classes for button
        .playlistButton {
            background-color: rgb(255, 255, 255);
        }
        .playlistButton__icon {
            transform: rotate(0deg);
        }


        &__songscontainer {
            margin-left: 1.5rem;
        }
    }

</style>