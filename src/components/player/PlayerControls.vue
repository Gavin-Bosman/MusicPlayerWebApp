<!-- Player Controls Component -->

<template>
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
        <div class="player__contents_controls-progressbar">
          <!-- Timestamp -->
          <!-- <p class="player__contents_controls-progressbar--timestamp">{{currentTime}}</p> -->
          <p class="player__contents_controls-progressbar--timestamp">
            {{ currentTime }}
          </p>

          <!-- The bar -->
          <!-- <div class="player__contents_controls-progressbar--bar"> -->
          <!-- The part of the bar that moves as the song progresses -->
          <!-- <div -->
          <!-- class="player__contents_controls-progressbar--bar---progress" -->
          <!-- ></div> -->
          <!-- </div> -->

          <div
            class="progressBar"
            ref="progressBar"
            @mouseover="hoverProgressBar"
            @mouseleave="hoverProgressBarLeave"
            @mousedown="startProgressBarDrag"
            @mousemove="dragProgressBar"
            @touchstart="startProgressBarDrag"
            @touchmove="dragProgressBar"
            @mouseup="endProgressBarDrag"
            @touchend="endProgressBarDrag"
          >
            <div
              class="progressBarFilled"
              :style="{
                width: this.isDragging ? this.position + 'px' : progress + '%',
              }"
            ></div>
            <div
              :style="{
                transform: `translateX(${
                  (this.progress / 100) * 63.5 + 'rem'
                }) translateY(-13.5px)`,
              }"
              class="circle"
              ref="progressCircle"
            ></div>
          </div>
          <!-- Total duration of the song that's playing -->
          <p class="player__contents_controls-progressbar--duration">
            {{ songLength ? formatLength(songLength) : "0:00" }}
          </p>
        </div>

        <!-- The control buttons -->
        <div class="player__contents_controls-buttons">
          <!-- Prev Button -->
          <button
            @click="previous"
            class="player__contents_controls-buttons--prevbox button-animation-2"
          >
            <img
              class="player__contents_controls-buttons--prevbox---icon"
              src="../../assets/prev_icon.svg"
              alt="Prev. Button"
            />
          </button>

          <!-- Play/Pause Button -->
          <button
            ref="playButton"
            @click="play"
            class="player__contents_controls-buttons--playpausebox button-animation-1"
          >
            <img
              class="player__contents_controls-buttons--playpausebox---icon"
              :src="this.currentState"
              alt="Pause/Play Button"
            />
          </button>

          <!-- Next Button -->
          <button
            @click="next"
            class="player__contents_controls-buttons--nextbox button-animation-2"
          >
            <img
              class="player__contents_controls-buttons--nextbox---icon"
              src="../../assets/next_icon.svg"
              alt="Next Button"
            />
          </button>

          <!-- Volume Button -->
          <div>
            <img src="../../assets/volumeIcon.png" alt="" />
            <div class="volumeBar" ref="volumeBar">
              <div
                class="volumeBarFilled"
                :style="{
                  width: this.volume ? this.volume + 'px' : 0,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref="audioPlayer"
        preload="none"
        class="audioPlayer"
        controls
        autoplay
        :src="songURL"
        :volume="0.3"
        style="margin-top: 50px"
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerControls",
  props: {
    songs: {
      type: Array,
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
  },
  data() {
    return {
      playButtonImage: require("@/assets/play_icon.svg"),
      pauseButtonImage: require("@/assets/pause_icon.svg"),
      currentState: require("@/assets/pause_icon.svg"),
      currentTime: "0:00",
      progress: 0,
      volume: 50,
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
      this.$refs.audioPlayer.next();
      console.log("NEXT");
    },
    previous() {
      this.$refs.audioPlayer.previous();
      console.log("PREVIOUS");
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
      this.dragProgressBar(event);
      document.addEventListener("mousemove", this.dragProgressBar);
      document.addEventListener("mouseup", this.endProgressBarDrag);
    },
    dragProgressBar(event) {
      if (this.isDragging) {
        const barRect = this.$refs.progressBar.getBoundingClientRect();
        const position = event.pageX || event.touches[0].pageX;
        const progress = (position - barRect.left) / barRect.width;
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
  },
  components: {},
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
  },
};
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/utilityClasses";

.audioPlayer {
  width: 100%;
  background: transparent !important;
  border: none;
}

.progressBar {
  position: relative;
  height: 10px;
  width: 65rem;
  margin: 0px 1rem 2px 1rem;
  background-color: rgb(255, 255, 255, 0.25);
  /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
  border-radius: 10px;
  user-select: none;
}
.progressBarFilled {
  height: 10px;
  width: 89%;
  background-color: rgb(255, 255, 255);
  /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
  border-radius: 10px;
}

.volumeBar {
  position: relative;
  height: 10px;
  width: 10rem;
  margin: 0px 1rem 2px 1rem;
  background-color: rgb(255, 255, 255, 0.25);
  border-radius: 10px;
  user-select: none;
}
.volumeBarFilled {
  height: 10px;
  width: 89%;
  background-color: rgb(255, 255, 255);
  /* transition: width 0.2s ease-in-out, left 0.2s ease-in-out; */
  border-radius: 10px;
}

.circle {
  position: relative;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  display: none;
}

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
    user-select: none;

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
          user-select: none;
        }
      }

      // Button controls
      &-buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 1rem;

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
