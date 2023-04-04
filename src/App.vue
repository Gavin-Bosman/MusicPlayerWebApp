<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

  <!-- Main Window/Component -->
  <MainPlayer />
  
</template>

<script>
import MainPlayer from './components/MainPlayer'

export default {
  name: 'App',
  components: {
    MainPlayer
  }
}
</script>

<style lang="scss">

  @import "./sass/variables";

  // Overall Body/App
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    scroll-behavior: smooth !important;
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden;
  }
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400; //Regular
    line-height: 3;
    overflow-x: hidden;
  }

</style>
