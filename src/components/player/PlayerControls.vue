<!-- Player Controls Component -->

<template>
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

            <!-- Progress Bar and Controls -->
            <div class="player__contents_controls">

                <!-- The bar -->
                <div class="player__contents_controls-progressbar">

                    <!-- Timestamp -->
                    <p class="player__contents_controls-progressbar--timestamp">3:02</p>

                    <!-- The bar -->
                    <div class="player__contents_controls-progressbar--bar">
                        <!-- The part of the bar that moves as the song progresses -->
                        <div class="player__contents_controls-progressbar--bar---progress"></div>
                    </div>

                    <!-- Total duration of the song that's playing -->
                    <p class="player__contents_controls-progressbar--duration">4:20</p>
                </div>

                <!-- The control buttons -->
                <div class="player__contents_controls-buttons">

                    <!-- Prev Button -->
                    <button class="player__contents_controls-buttons--prevbox button-animation-2">
                        <img class="player__contents_controls-buttons--prevbox---icon" src="../../assets/prev_icon.svg" alt="Prev. Button">
                    </button>

                    <!-- Play/Pause Button -->
                    <button class="player__contents_controls-buttons--playpausebox button-animation-1">
                        <img class="player__contents_controls-buttons--playpausebox---icon" src="../../assets/pause_icon.svg" alt="Pause/Play Button">
                    </button>

                    <!-- Next Button -->
                    <button class="player__contents_controls-buttons--nextbox button-animation-2">
                        <img class="player__contents_controls-buttons--nextbox---icon" src="../../assets/next_icon.svg" alt="Next Button">
                    </button>

                </div>
                
            </div>
            
            <audio controls :src="songURL" :volume="0.3" style="margin-top: 50px"></audio>

        </div>
    </div>

</template>




<script>
export default {
  name: 'PlayerControls',
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
    }
  },
  components: {

  },
  computed: {
    getCoverArt() {
        return this.coverArt ? this.coverArt : require('@/assets/default_coverimage.png');
    }
  }
}
</script>




<style lang="scss">

    @import "../../sass/variables";
    @import "../../sass/utilityClasses";

    .player {
        //flex: 0 0 70%;
        flex-grow: 1;

        display: flex;
        align-items: center;
        justify-content: center;

        
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


            &_controls {

                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                margin-top: 1rem;


                // Progress Bar
                &-progressbar {

                    display: flex;
                    align-items: center;

                    text-shadow: 0px 2px 3px #000000bb;

                    &--timestamp {
                        color: $color-white;
                        font-size: 1.4rem;
                        font-weight: 400;
                    }

                    &--bar {
                        
                        position: relative;
                        width: 65rem;
                        height: 6px;
                        background-color: rgba(255, 255, 255, 0.25);
                        border-radius: 40px;
                        margin-left: 1rem;
                        margin-right: 1rem;

                        &---progress {

                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                            width: 70%; // This property should change dynamically as the song progresses
                            border-radius: 40px;
                            background-color: $color-white;
                        }
                    }

                    &--duration {
                        color: $color-white;
                        font-size: 1.4rem;
                        font-weight: 400;
                    }
                }


                // Button controls
                &-buttons {

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    margin-top: 1rem;


                    &--prevbox {

                        margin-top: 1.0rem;
                        background-color: transparent;
                        border: none;
                        width: 5rem;
                        height: 5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease-out;

                        &---icon {
                            width: 90%;
                        }
                    }

                    &--playpausebox {

                        margin-left: 2rem;
                        margin-right: 2rem;
                        width: 6rem;
                        height: 6rem;
                        border-radius: 50%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: none;
                        background-color: $color-white;
                        cursor: pointer;
                        box-shadow: 0px 5px 6px 0px #00000070;
                        transition: all 0.2s ease-out;

                        &---icon {
                            width: 30%;
                        }
                    }

                    &--nextbox {

                        margin-top: 1.0rem;
                        background-color: transparent;
                        border: none;
                        width: 5rem;
                        height: 5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.2s ease-out;

                        &---icon {
                            width: 90%;
                        }
                    }
                }
            }
        }
    }

</style>