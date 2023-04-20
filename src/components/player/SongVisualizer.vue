<template>
  <div class="container" ref="container">This is the visualizer component</div>
</template>

<script>
// import * as THREE from "three";
// import axios from "axios";

// export default {
//   name: "SongVisualizer",
//   props: {
//     songName: {
//       type: String,
//       required: false,
//     },
//   },
//   mounted() {
//     this.init();
//     this.animate();
//   },
//   methods: {
//     init() {
//       // Create a new Three.js scene

//       console.log("INIT HAS BEEN CALLED");
//       this.scene = new THREE.Scene();

//       // Create a new Three.js camera
//       this.camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       this.camera.position.z = 5;

//       // Create a new Three.js audio listener and add it to the camera
//       this.listener = new THREE.AudioListener();
//       this.camera.add(this.listener);

//       // Create a new Three.js renderer and add it to the container
//       this.renderer = new THREE.WebGLRenderer();
//       this.renderer.setSize(window.innerWidth, window.innerHeight);
//       this.$refs.container.appendChild(this.renderer.domElement);

//       // Create a new Three.js geometry and material
//       this.geometry = new THREE.SphereGeometry(1, 32, 32);
//       this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });

//       this.renderer.setSize(400, 400)
//       this.renderer.setClearColor(0x000000, 0);


//       // Create a new Three.js mesh and add it to the scene
//       this.mesh = new THREE.Mesh(this.geometry, this.material);
//       this.scene.add(this.mesh);

//       // Create a new Three.js audio object
//       this.audio = new THREE.Audio(this.listener);

//       // Get Song

//       const url = "http://localhost:5000/api/songs/id/643fdd793110937dd6e369c0";

//       axios
//         .get(url, { responseType: "arraybuffer" })
//         .then((response) => {
//           // Access the data attribute containing the audio file
//           const audioData = response.data;

//           // Create a new Three.js audio object
//           this.audio = new THREE.Audio(this.listener);

//           // Decode the audio data using the Web Audio API's AudioContext
//           const audioContext = new (window.AudioContext ||
//             window.webkitAudioContext)();
//           audioContext.decodeAudioData(audioData, (buffer) => {
//             // Set the buffer as the audio object's source
//             this.audio.setBuffer(buffer);

//             // Create a new Three.js audio analyser
//             this.analyser = new THREE.AudioAnalyser(this.audio, 256);

//             // Set up any other audio-related code here
//           });
//         })
//         .catch((error) => {
//           console.error("Failed to load audio file", error);
//         });
//     },

//     animate() {
//       // console.log("I AM BEING CALLED");
//       // Animate the visualizer
//       requestAnimationFrame(this.animate);

//       // Update the visualizer based on the audio data
//       if (this.analyser) {
//         const data = this.analyser.getFrequencyData();
//         this.audio.play();

//         // Set the scale of the mesh based on the frequency data
//         // this.mesh.scale.set(data[0] / 255, data[1] / 255, data[2] / 255);
//         this.mesh.scale.set(
//           1 + data[0] / 255,
//           1 + data[1] / 255,
//           1 + data[2] / 255
//         );
//       }

//       // Render the scene
//       this.renderer.render(this.scene, this.camera);
//     },
//   },
// };
</script>
