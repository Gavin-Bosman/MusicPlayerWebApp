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
  @import "./sass/mediaquery-manager";

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
    overflow-y: hidden;
    overflow: hidden !important;

    @include respond(mediumScreen) { // Width < 1400 ?
      font-size: 59.5%;
    }
    @include respond(tabletScreen) { // Width < 1000 ?
      font-size: 69%;
    }
    @include respond(phoneScreen) { // Width < 450 ?
      font-size: 55%;
    }
    @include respond(phoneSmallScreen) { // Width < 300 ?
      font-size: 40%;
    }
  }
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400; //Regular
    line-height: 3;
    overflow-x: hidden;
    overflow-y: hidden;
    overflow: hidden !important;
  }


  //Change highlight color
  ::-moz-selection {
    background-color: $color-primary;
    color: $color-dark;
  }
  ::selection {
    background-color: $color-primary;
    color: $color-dark;
  }


  //Custom Scroll-bar
  ::-webkit-scrollbar {
    width: 1rem;
    background-color: $color-dark;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(37, 37, 37);
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(61, 61, 61);
  }

</style>
