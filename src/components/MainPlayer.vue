<!-- THIS IS THE MAIN VIEW/WINDOW -->

<template>
    <div class="main__window">
        <SideBar />
    </div>
</template>



<script>

import SideBar from './sidebar/SideBar';

export default {
  name: 'MainPlayer',
  components: {
    SideBar
  }
}
</script>



<style lang="scss">

    @import "../sass/variables";

    .main__window {
        min-width: 100vw;
        min-height: 100vh;
        background-color: $color-primary;
        background: $color-dark;
        background: linear-gradient(0deg, rgba(24,24,24,1) 0%, rgba(37,61,57,1) 66%, rgba(50,96,89,1) 100%, rgba(58,119,110,1) 100%, rgba(68,148,136,1) 100%, rgba(95,227,207,1) 100%, rgba(105,255,232,1) 100%);
    }

</style>