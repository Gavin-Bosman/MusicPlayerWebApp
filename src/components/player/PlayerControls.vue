<!-- Player Controls Component -->

<template>
  <div class="login_container">
    <LoginButton v-if="loggedIn == false" @LogIn="displayAccount" />
    <AccountMenu v-if="loggedIn == true" @signOut="signOut"/>
  </div>
  <div class="player">
    <div class="player__contents">
      <!-- Image -->
      <div class="player__contents_coverphotobox">
        <!-- <img class="player__contents_coverphotobox-photo" src="../../assets/imaginedragons_enemy_photo.jpg" alt="Album Image"> -->
        <!-- <img class="player__contents_coverphotobox-photo" src="../../assets/NF-HOPE.png" alt="Album Image"> -->
        <img
          class="player__contents_coverphotobox-photo"
          :src="getCoverArt"
          alt="Album Image"
        />
      </div>

            <!-- Song and Artist Name -->
            <div class="player__contents_details">
                <h3 class="player__contents_details-songname">{{ songName }}</h3>
                <h4 class="player__contents_details-artistname">{{ artistName }}</h4>
            </div>

            <!-- Progress Bar and Controls -->
            <div class="player__contents_controls">
                <!-- The bar -->
                <!-- <div class="player__contents_controls-progressbar--bar"> -->
                <!-- The part of the bar that moves as the song progresses -->
                <!-- <div -->
                <!-- class="player__contents_controls-progressbar--bar---progress" -->
                <!-- ></div> -->
                <!-- </div> -->

                <!-- Current Time -->
                <p class="player__contents_controls-progressbar--timestamp">
                    {{ currentTime }}
                </p>

                <div class="player_contents_controls-progressbar--bar--progress, progressBar" ref="progressBar"
                    @mouseover="hoverProgressBar" @mouseleave="hoverProgressBarLeave" @mousedown="startProgressBarDrag"
                    @mousemove="dragProgressBar" @touchstart="startProgressBarDrag" @touchmove="dragProgressBar"
                    @mouseup="endProgressBarDrag" @touchend="endProgressBarDrag">
                    <div class="progressBarFilled" :style="{
                        width: this.isDragging ? this.position + 'px' : progress + '%',
                    }"></div>
                    <div :style="{
                        transform: `translateX(${(this.progress / 100) * 63.5 + 'rem'
                            }) translateY(-13.5px)`,
                    }" class="circle" ref="progressCircle"></div>
                </div>

                <!-- Total duration of the song that's playing -->
                <p class="player__contents_controls-progressbar--duration">
                    {{ songLength ? formatLength(songLength) : "0:00" }}
                </p>
            </div>

            <!-- The control buttons -->
            <div class="player__contents_controls-buttons">
                <!-- Prev Button -->
                <button @click="previous" class="player__contents_controls-buttons--prevbox button-animation-2">
                    <img class="player__contents_controls-buttons--prevbox---icon" src="../../assets/prev_icon.svg"
                        alt="Prev. Button" />
                </button>

                <!-- Play/Pause Button -->
                <button ref="playButton" @click="play"
                    class="player__contents_controls-buttons--playpausebox button-animation-1">
                    <img class="player__contents_controls-buttons--playpausebox---icon" :src="this.currentState"
                        alt="Pause/Play Button" />
                </button>

                <!-- Next Button -->
                <button @click="next" class="player__contents_controls-buttons--nextbox button-animation-2">
                    <img class="player__contents_controls-buttons--nextbox---icon" src="../../assets/next_icon.svg"
                        alt="Next Button" />
                </button>

        <!-- Volume Button -->
        <div class="volumeBar__container">

          <div class="volumeBar__iconBox">
            <img src="../../assets/volumeIcon.png" alt="Volume Icon" class="volumeBar__iconBox_icon">
          </div>

          <div
            title="DRAG For Volume"
            class="volumeBar"
            ref="volumeBar"
            @mousedown="startVolumeBarDrag"
            @mousemove="dragVolumeBar"
            @touchstart="startVolumeBarDrag"
            @touchmove="dragVolumeBar"
            @mouseup="endVolumeBarDrag"
            @touchend="endVolumeBarDrag"
            @mousewheel="scrollVolumeBar"
          >
            <!-- <img src="../../assets/volumeIcon. png" alt="" /> -->
            <div
              title="DRAG For Volume"
              class="volumeBarFilled"
              :style="{
                width: this.isDraggingVol
                  ? this.volume + 'px'
                  : this.volume + 'px',
              }"
            ></div>
          </div>

        </div>
        



      </div>
    </div>
  </div>

    <audio ref="audioPlayer" preload="none" class="audioPlayer" controls autoplay :src="songURL" :volume="0.3"
        style="margin-top: 50px; display: none"></audio>
</template>

<script>
import LoginButton from "./login/LoginButton.vue";
import AccountMenu from "./login/AccountMenu.vue";

export default {
    name: "PlayerControls",
    props: {
        songs: {
            type: Array,
            default: () => [],
        },
        songName: {
            type: String,
            default: "",
        },
        artistName: {
            type: String,
            default: "",
        },
        coverArt: {
            type: String,
            default: "",
        },
        songURL: {
            type: String,
            default: "",
        },
        songLength: {
            type: [String, Number],
            default: "",
        },
        currentIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            playButtonImage: require("@/assets/play_icon.svg"),
            pauseButtonImage: require("@/assets/pause_icon.svg"),
            currentState: require("@/assets/pause_icon.svg"),
            currentTime: "0:00",
            progress: 0,
            volume: 3,
            isDragging: false,
            isDraggingVol: false,
            loggedIn: false,
        };
    },
    methods: {
        play() {
            if (this.$refs.audioPlayer.paused) {
                this.$refs.audioPlayer.play();
                this.currentState = this.pauseButtonImage;
            } else {
                this.$refs.audioPlayer.pause();
                this.currentState = this.playButtonImage;
            }
        },
        next() {
            if (this.currentIndex + 1 < this.songs.length) {
                this.$emit("nextSong", this.songs[this.currentIndex + 1].fileName);
            }
            this.currentState = this.pauseButtonImage;
        },
        previous() {
            if (this.$refs.audioPlayer.currentTime > 4) {
                this.$refs.audioPlayer.currentTime = 0;
                return;
            }
            if (this.currentIndex - 1 > -1) {
                this.$emit("previousSong", this.songs[this.currentIndex - 1].fileName);
            }
            this.currentState = this.pauseButtonImage;
        },
        // Format Length of Song Timestamps
        formatLengthM(time) {
            const minutes = Math.floor(time / 60);
            const remainingSeconds = (time % 60).toFixed(0);
            const formattedSeconds =
                remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
            return `${minutes}:${formattedSeconds}`;
        },
        // Progress Bar Interactivity Methods
        hoverProgressBar() {
            //   this.$refs.progressCircle.style.display = "block";
        },
        hoverProgressBarLeave() {
            if (!this.isDragging) {
                // this.$refs.progressCircle.style.display = "none";
            }
        },
        startProgressBarDrag(event) {
            this.isDragging = true;
            this.isDragging = true;
            this.dragProgressBar(event);
            document.addEventListener("mousemove", this.dragProgressBar);
            document.addEventListener("mouseup", this.endProgressBarDrag);
        },
        dragProgressBar(event) {
            if (this.isDragging) {
                const barRect = this.$refs.progressBar.getBoundingClientRect();
                let position = event.pageX || event.touches[0].pageX;
                let progress = (position - barRect.left) / barRect.width;

                if (progress > 1) {
                    progress = 1;
                    position = barRect.right;
                }

                this.progress = progress * 100;
                this.position = position - barRect.left;
            }
        },
        endProgressBarDrag(event) {
            if (this.isDragging) {
                this.isDragging = false;
                const audio = this.$refs.audioPlayer;

                const barRect = this.$refs.progressBar.getBoundingClientRect();
                let position = event.pageX || event.touches[0].pageX;
                let progress = (position - barRect.left) / barRect.width;
                progress = progress * 100;
                position = position - barRect.left;

                audio.currentTime = (progress / 100) * audio.duration;
                document.addEventListener("mousemove", this.dragProgressBar);
                document.addEventListener("mouseup", this.endProgressBarDrag);
            }
        },
        // Volume Bar Interactivity Methods
        startVolumeBarDrag(event) {
            this.isDraggingVol = true;
            this.dragProgressBar(event);
            document.addEventListener("mousemove", this.dragVolumeBar);
            document.addEventListener("mouseup", this.endVolumeBarDrag);
        },
        dragVolumeBar(event) {
            if (this.isDraggingVol) {
                const barRect = this.$refs.volumeBar.getBoundingClientRect();
                let positionVol = event.pageX || event.touches[0].pageX;
                let volume = (positionVol - barRect.left) / barRect.width;

                if (volume > 1) {
                    volume = 1;
                    positionVol = barRect.right;
                }
                if (volume < 0) {
                    volume = 0;
                    positionVol = barRect.right;
                }

                this.volume = volume * 100;
                this.positionVol = positionVol - barRect.left;
            }
        },
        endVolumeBarDrag(event) {
            if (this.isDraggingVol) {
                this.isDraggingVol = false;
                const audio = this.$refs.audioPlayer;

                const barRect = this.$refs.volumeBar.getBoundingClientRect();
                let positionVol = event.pageX || event.touches[0].pageX;
                let volume = (positionVol - barRect.left) / barRect.width;
                volume = volume * 100;
                positionVol = positionVol - barRect.left;

                if (volume > 100) {
                    volume = 100;
                    this.volume = 100;
                    positionVol = barRect.right;
                }
                if (volume < 0) {
                    volume = 0;
                    this.volume = 0;
                    positionVol = barRect.right;
                }

                //Divide by 4 because player starts compressing way too fast
                audio.volume = volume / 100 / 4;
                document.addEventListener("mousemove", this.dragVolumeBar);
                document.addEventListener("mouseup", this.endVolumeBarDrag);
            }
        },
        scrollVolumeBar(event) {
            const scrollPos = event.deltaY;

      if (scrollPos < 0) {
        if (this.volume + 8 <= 100) {
          this.volume += 8;
        } else {
          this.volume = 100;
        }
      } else {
        if (this.volume - 8 >= 0) {
          this.volume -= 8;
        } else {
          this.volume = 0;
        }
      }
      //Divide by 4 because player starts compressing way too fast
      this.$refs.audioPlayer.volume = this.volume / 100 / 4;
    },
    displayAccount(user) {
      console.log(user);
      this.loggedIn = true;
    },
    signOut(loggedIn) {
      this.loggedIn = loggedIn;
    }
  },
  components: { LoginButton, AccountMenu },
  computed: {
    getCoverArt() {
      return this.coverArt
        ? this.coverArt
        : require("@/assets/default_coverimage.png");
    },
    formatLength() {
      return (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(0);
        const formattedSeconds =
          remainingSeconds < 10
            ? `0${remainingSeconds}`
            : `${remainingSeconds}`;
        return `${minutes}:${formattedSeconds}`;
      };
    },
  },
  mounted() {
    if (this.$refs.audioPlayer) {
      this.$refs.audioPlayer.addEventListener("timeupdate", () => {
        if (this.$refs.audioPlayer) {
          this.currentTime = this.formatLengthM(
            this.$refs.audioPlayer.currentTime
          );
          this.progress =
            (this.$refs.audioPlayer.currentTime / this.songLength) * 100;
          //   console.log(this.progress);
        }
      });
    } else {
      this.currentTime = "0:00";
    }
    this.$refs.audioPlayer.volume = this.volume / 100;
  },
};
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/utilityClasses";
@import "../../sass/mediaquery-manager";

.audioPlayer {
    width: 100%;
    background: transparent !important;
    border: none;
}

.volumeIcon {
    position: absolute;
    transform: translateX(20rem) scale(40%);
}

.progressBar {
    position: relative;
    line-height: normal;
    height: 10px;
    width: 65rem;
    margin: 0px 1rem 2px 1rem;
    background-color: rgb(255, 255, 255, 0.25);
    /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    overflow: hidden;

    @include respond(mediumScreen) {
        // Width < 1400 ?

    }

    @include respond(tabletScreen) {
        // Width < 1000 ?
        width: 50rem;
    }

    @include respond(tabletSmallScreen) {
        // Width < 650 ?
        width: 33rem;
    }

    @include respond(phoneScreen) {
        // Width < 450 ?
        width: 28rem;
    }

    @include respond(phoneSmallScreen) {
        // Width < 300 ?

    }
}

.progressBarFilled {
    height: 100%;
    width: 89%;
    background-color: rgb(255, 255, 255);
    /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
    border-radius: 10px;
    cursor: pointer;
}

.volumeBar__container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 52rem;

  @include respond(mediumScreen) { // Width < 1400 ?

  }
  @include respond(tabletScreen) { // Width < 1000 ?
    margin-left: 37rem;
  }
  @include respond(tabletSmallScreen) { // Width < 650 ?
    margin-left: 0;
    margin-top: 13rem;
  }
  @include respond(phoneScreen) { // Width < 450 ?

  }
  @include respond(phoneSmallScreen) { // Width < 300 ?

  }
}
.volumeBar__iconBox {

  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  overflow: hidden;

  &_icon {
    height: 100%;
    width: 100%;
  }
}
.volumeBar {
  height: 10px;
  width: 10rem;
  background-color: rgb(255, 255, 255, 0.25);
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  overflow: hidden;

    @include respond(mediumScreen) {
        // Width < 1400 ?

  }
  @include respond(tabletScreen) { // Width < 1000 ?

  }
  @include respond(tabletSmallScreen) { // Width < 650 ?
    width: 7rem;
  }
  @include respond(phoneScreen) { // Width < 450 ?

  }
  @include respond(phoneSmallScreen) { // Width < 300 ?

    }
}

.volumeBarFilled {
    height: 100%;
    width: 89%;
    background-color: rgb(255, 255, 255);
    /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
    border-radius: 10px;
    cursor: pointer;
}

.circle {
    position: relative;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    display: none;
}


.login_container {
    display: flex;
    justify-content: right;
    flex-direction: row;
    position: relative;
    padding: 3rem 3rem;
    padding-bottom: 0;
}

.audioPlayer {
    width: 150%;
    margin-top: 3rem;
    background: transparent !important;
    border: none;
    display: none; // Remove/comment-out this line if you want to see the html audio player
}

.player {
    //flex: 0 0 70%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    //transition: all .2s ease-out;

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
            user-select: none;

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
            text-shadow: 0px 4px 4px #000000bb;

            &-songname {
                font-size: 3rem;
                font-weight: 500;
                letter-spacing: 1px;
            }

            &-artistname {
                font-size: 2rem;
                font-weight: 400;
                color: rgb(220, 220, 220);
                margin-top: 1rem;
                text-shadow: 0px 3px 3px #000000bb;
            }
        }

        &_controls {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1.5rem;

            // Progress Bar
            &-progressbar {
                display: flex;
                align-items: center;
                text-shadow: 0px 2px 3px #000000bb;

                &--timestamp {
                    color: $color-white;
                    font-size: 1.4rem;
                    font-weight: 400;
                    line-height: normal;
                    user-select: none;
                }

                &--bar {
                    position: relative;
                    width: 65rem;
                    height: 6px;
                    background-color: rgba(255, 255, 255, 0.25);
                    border-radius: 40px;
                    margin-left: 1rem;
                    margin-right: 1rem;

                    @include respond(tabletScreen) {
                        // Width < 1000 ?
                        width: 40rem;
                    }

                    @include respond(tabletSmallScreen) {
                        // Width < 650 ?
                        width: 30rem;
                    }

                    @include respond(phoneScreen) {
                        // Width < 450 ?
                        width: 25rem;
                    }

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
                    line-height: normal;
                    user-select: none;
                }
            }

            // Button controls
            &-buttons {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 2rem;

                &--prevbox {
                    margin-top: 1rem;
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
                    margin-top: 1rem;
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
