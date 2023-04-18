<!-- Player Controls Component -->

<template>

    <!-- Login/Signup Top Bar -->
    <div class="login_container" >
            <LoginButton v-if="loggedIn == false" @LogIn="displayAccount" />
            <AccountMenu v-if="loggedIn == true" />
    </div>

    <!-- Player -->
    <div class="player">
        <div class="player__contents">
            <!-- Image -->
            <div class="player__contents_coverphotobox">
                <!-- <img class="player__contents_coverphotobox-photo" src="../../assets/imaginedragons_enemy_photo.jpg" alt="Album Image"> -->
                <!-- <img class="player__contents_coverphotobox-photo" src="../../assets/NF-HOPE.png" alt="Album Image"> -->
                <img class="player__contents_coverphotobox-photo" :src="getCoverArt" alt="Album Image">
            </div>

            <!-- Song and Artist Name -->
            <div class="player__contents_details">
                <h3 class="player__contents_details-songname">{{ songName }}</h3>
                <h4 class="player__contents_details-artistname">{{ artistName }}</h4>
            </div>
            
            <audio preload="none" class="audioPlayer player__contents_audioPlayer" controls autoplay :src="songURL" :volume="0.3"></audio>

        </div>
    </div>

</template>




<script>
import LoginButton from './login/LoginButton.vue'
import AccountMenu from './login/AccountMenu.vue'

export default {
  name: 'PlayerControls',
  components: {LoginButton, AccountMenu},
  data() {
    return {
        loggedIn: false,
    }
  },
  props: {
    songs: {
        type: Array,
    },
    songName: {
        type: String,
        default: '',
    },
    artistName: {
        type: String,
        default: '',
    },
    coverArt: {
        type: String,
        default: '',
    },
    songURL: {
        type: String,
        default: '',
    },
    songLength: {
        type: [String, Number],
        default: '',
    }
  },
  methods: {
    displayAccount(user) {
        console.log(user);
        this.loggedIn = true;
    }
  },
  computed: {
    getCoverArt() {
        return this.coverArt ? this.coverArt : require('@/assets/default_coverimage.png');
    },
    formatLength() {
        return (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(0);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
        return `${minutes}:${formattedSeconds}`;
        }
    }
    }
}
</script>




<style lang="scss">

    @import "../../sass/variables";
    @import "../../sass/utilityClasses";


    // Login stuff
    .login_container {
        display: flex;
        justify-content: right;
        padding: 3rem 3rem;
    }




    .player {
        //flex: 0 0 70%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
        &__contents {

            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            // Cover Photo
            &_coverphotobox {

                width: 25rem;
                height: 25rem;
                overflow: hidden;
                border-radius: 10px;
                object-fit: cover;
                display: flex;
                justify-content: center;
                border: none;
                box-shadow: 0px 5px 20px 0px #00000067;

                &-photo {
                    backface-visibility: hidden;
                }
            }


            // Name and Artist
            &_details {

                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                margin-top: 2rem;
                color: $color-white;
                line-height: normal;
                text-shadow: 0px 5px 5px #000000bb;

                &-songname {
                    font-size: 3rem;
                    font-weight: 500;
                    letter-spacing: 3px;
                    
                }

                &-artistname {
                    font-size: 2rem;
                    font-weight: 400;
                    color: $color-grey-lighter;
                    margin-top: 1rem;
                }
            }

            &_audioPlayer {
                width: 150%;
                margin-top: 3rem; 
                background-color: rgba(255, 255, 255, 0); 
                border-radius: 6px !important;
            }
        }
    }

</style>