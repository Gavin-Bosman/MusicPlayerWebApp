<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

  <!-- Main Window/Component -->
  <MainPlayer />
  
</template>

<script>
import MainPlayer from './components/MainPlayer.vue'

export default {
  name: 'App',
  components: {
    MainPlayer
  }
}
</script>

<style lang="scss">

  // Declaring color variables
  $color-primary: #69FFE8;
  $color-primary-dark: #3EC6B2;
  $color-dark: #181818;
  $color-white: #ffffff;

  // Overall App/Body
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: $color-dark;
  }

</style>
