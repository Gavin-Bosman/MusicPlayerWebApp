<!-- Main Sidebar Component -->

<template>
    <nav class="sidebar">
        <!-- Logo and Name -->
        <div class="brandbox d-flex">
            <div class="brandbox__logobox">
                <img class="brandbox__logobox_logo" src="../../assets/logo_white_stroke.svg" alt="Audiowave Logo">
            </div>
            <h1 class="brandbox__name">Audio<span class="brandbox__name_span">wave</span></h1>

            <!-- Expand/Collapse Button -->
            <button class="sidebar__button">></button>
        </div>

        <!-- The Search Bar -->
        <form action="#" class="search">
            <input class="search__input" type="text" placeholder="Search for songs...">
            <button class="search__button"><img class="search__button_icon" src="../../assets/search_icon.svg" alt="Search Icon"></button>
        </form>

        <!-- Song list begins here -->
        <h2 class="songs__header">Songs</h2>

        <!-- Scrollable div -->
        <div class="songslist">
            <!-- <SongItem songname="Enemy" artistname="Imagine Dragons" coverimageSrc="https://assets.3dtotal.com/arcane-imagine-dragons.edcsyl.jpg"/> -->
            <!-- <SongItem songname="SUFFICE" artistname="NF" coverimageSrc="../../assets/NF-HOPE.png"/> -->
            <SongItem songname="SUFFICE" artistname="NF" :coverimageSrc="require('@/assets/NF-HOPE.png')"/>


        </div>

    </nav>
</template>




<script>

import SongItem from './SongItem';

export default {
  name: 'SideBar',
  components: {
    SongItem
  }
}
</script>




<style lang="scss">

    @import "../../sass/variables";
    @import "../../sass/utilityClasses";

    // General sidebar Styling
    .sidebar {
        position: relative;
        top: 0;
        left: 0;
        height: 100vh;
        flex: 0 0 30%;
        opacity: 95%;
        background-color: $color-dark;
        padding: 3.5rem 5rem;


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
            background-color: $color-grey-dark;
            cursor: pointer;
            box-shadow: 0px 3px 7px 0px #00000041;
            transform: translateX(7rem);
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
        
        &__logobox {
            width: 5rem;
            height: 5rem;
            margin-right: 1.5rem;

            &_logo {
                width: 100%;
                height: 100%;
            }
        }

        &__name {
            color: $color-white;
            font-size: 3rem;
            font-weight: 400;
            letter-spacing: 3px;

            &_span {
                color: $color-primary;
            }
        }
    }


    // Searchbar Styling
    .search {
        display: flex;
        align-items: center;

        margin-top: 2rem;

        &__input {
            border: none;
            background-color: $color-grey-dark;
            padding: 1.8rem 2rem;
            width: 90%;
            border-radius: 5px;
            font-size: 1.5rem;
            font-weight: 400;
            color: $color-grey;
            transition: all .2s;
            margin-right: -4rem;

            &:focus {
                outline: none;
                width: 100%;
                color: $color-dark;
                background-color: $color-white;
            }

            &::-webkit-input-placeholder {
                color: $color-grey;
            }
        }

        &__button {
            border: none;
            width: 2.5rem;
            height: 2.5rem;
            background-color: transparent;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            &:active {

            }

            &_icon {
                width: 100%;
                height: 100%;
            }
        }
    }


    // Songs
    .songs__header {
        margin-top: 2rem;
        color: $color-white;
        font-weight: 400;
        letter-spacing: 1px;
        font-size: 1.5rem;
        border-bottom: 1px solid $color-grey-darker;
    }

    .songslist {
        position: relative;
        margin-top: 2rem;
        width: 100%;
        height: 65%;
        overflow-x: hidden;
        overflow-y: scroll;
        box-shadow: inset -4px 0px 10px 1px rgba(0, 0, 0, 0.055);
    }
    
</style>