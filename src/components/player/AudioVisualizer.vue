<template>
    <div ref="visualizer"></div>
</template>
  
<script>
import * as THREE from 'three';

export default {
    name: 'AudioVisualizer',
    props: {
        audioPlayer: {
            required: true,
            type: Object,
        },
    },
    mounted() {
        this.initAudioAnalysis();
        this.initThreeJS();
    },
    methods: {
        initAudioAnalysis() {
            const audioContext = new AudioContext();
            this.analyser = audioContext.createAnalyser();
            this.audioSource = audioContext.createMediaElementSource(this.audioPlayer);
            this.audioSource.connect(this.analyser);
            this.analyser.connect(audioContext.destination);
        },
        initThreeJS() {
            // Create the scene and camera
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;

            // Create the renderer
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.visualizer.appendChild(this.renderer.domElement);

            // Add a simple cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube = new THREE.Mesh(geometry, material);
            this.scene.add(this.cube);

            // Start rendering loop
            this.animate();
        },
        animate() {
            requestAnimationFrame(this.animate);

            // Analyze audio data
            const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(dataArray);

            // Calculate the average frequency value
            const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

            // Scale the cube based on the average frequency
            const scale = 1 + average / 100;
            this.cube.scale.set(scale, scale, scale);

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        },
    },
};
</script>
  
<style scoped>
.visualizer {
    width: 100%;
    height: 100%;
}
</style>
  