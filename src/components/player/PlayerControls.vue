<!-- Player Controls Component -->

<template>
    <!-- Login/Signup Top Bar -->
    <div class="login_container">
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
                <img class="player__contents_coverphotobox-photo" :src="getCoverArt" alt="Album Image" />
            </div>

            <!-- Song and Artist Name -->
            <div class="player__contents_details">
                <h3 class="player__contents_details-songname">{{ songName }}</h3>
                <h4 class="player__contents_details-artistname">{{ artistName }}</h4>
            </div>

            <audio ref="audioPlayer" preload="none" class="audioPlayer player__contents_audioPlayer" controls autoplay
                :src="songURL" :volume="0.3"></audio>
        </div>
        <!-- <SongVisualizer :songName="songName" :audioPlayer="audioPlayer" /> -->
        <!-- <AudioVisualizer v-if="audioPlayer" :audioPlayer="audioPlayer" /> -->
        <div class="container" ref="container">This is the visualizer component</div>

    </div>
</template>

<script>
import LoginButton from "./login/LoginButton.vue";
import AccountMenu from "./login/AccountMenu.vue";
// import SongVisualizer from "./SongVisualizer.vue";
// import AudioVisualizer from "./AudioVisualizer.vue";

import * as THREE from "three";
import axios from "axios";


export default {
    name: "PlayerControls",
    components: {
        LoginButton, AccountMenu,
        // SongVisualizer,
        // AudioVisualizer,
    },
    data() {
        return {
            loggedIn: false,
            audioPlayer: null,
        };
    },
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
        songID: {
            type: String,
            default: "",
        },
        songLength: {
            type: [String, Number],
            default: "",
        },
    },
    watch: {
        songID: function (newSongID) {
            const url = `http://localhost:5000/api/songs/id/${newSongID}`;
            axios
                .get(url, { responseType: "arraybuffer" })
                .then((response) => {
                    // Access the data attribute containing the audio file
                    const audioData = response.data;

                    // Decode the audio data using the Web Audio API's AudioContext
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContext.decodeAudioData(audioData, (buffer) => {
                        // Set the buffer as the audio object's source
                        this.audio.setBuffer(buffer);

                        // Create a new Three.js audio analyser
                        this.analyser = new THREE.AudioAnalyser(this.audio, 256);

                        // Set up any other audio-related code here
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    methods: {
        displayAccount(user) {
            console.log(user);
            this.loggedIn = true;
        },

        // VISUALIZER 
        init() {
            // Create a new Three.js scene

            console.log("INIT HAS BEEN CALLED");
            this.scene = new THREE.Scene();

            // Create a new Three.js camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;

            // Create a new Three.js audio listener and add it to the camera
            this.listener = new THREE.AudioListener();
            this.camera.add(this.listener);

            // Create a new Three.js renderer and add it to the container
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.container.appendChild(this.renderer.domElement);

            // Create a new Three.js geometry and material
            this.geometry = new THREE.SphereGeometry(1, 32, 32);
            this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });

            this.renderer.setSize(400, 400)
            this.renderer.setClearColor(0x000000, 0);


            // Create a new Three.js mesh and add it to the scene
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.mesh);

            // Create a new Three.js audio object
            this.audio = new THREE.Audio(this.listener);

            // Get Song

            const url = `http://localhost:5000/api/songs/id/${this.songID}`;

            axios
                .get(url, { responseType: "arraybuffer" })
                .then((response) => {
                    // Access the data attribute containing the audio file
                    const audioData = response.data;

                    // Create a new Three.js audio object
                    this.audio = new THREE.Audio(this.listener);

                    // Decode the audio data using the Web Audio API's AudioContext
                    const audioContext = new (window.AudioContext ||
                        window.webkitAudioContext)();
                    audioContext.decodeAudioData(audioData, (buffer) => {
                        // Set the buffer as the audio object's source
                        this.audio.setBuffer(buffer);

                        // Create a new Three.js audio analyser
                        this.analyser = new THREE.AudioAnalyser(this.audio, 256);

                        // Set up any other audio-related code here
                    });
                })
                .catch((error) => {
                    console.error("Failed to load audio file", error);
                });
        },

        animate() {
            // console.log("I AM BEING CALLED");
            // Animate the visualizer
            requestAnimationFrame(this.animate);

            // Update the visualizer based on the audio data
            if (this.analyser) {
                const data = this.analyser.getFrequencyData();
                this.audio.play();

                // Set the scale of the mesh based on the frequency data
                // this.mesh.scale.set(data[0] / 255, data[1] / 255, data[2] / 255);
                this.mesh.scale.set(
                    1 + data[0] / 255,
                    1 + data[1] / 255,
                    1 + data[2] / 255
                );
            }

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        },
    },
    mounted() {
        this.audioPlayer = this.$refs.audioPlayer;
        this.init();
        this.animate();
    },
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
};
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
