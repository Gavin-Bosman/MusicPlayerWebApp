<!-- Song List Item Component -->

<template>
    <div class="songitem">
        <!-- Image -->
        <figure class="songitem__coverbox">
            <img class="songitem__coverbox_coverimage" src="../../assets/imaginedragons_enemy_photo.jpg" alt="Album Cover Image">
        </figure>
        
        <!-- Song and Artist Name -->
        <div class="songitem__details">
            <h3 class="songitem__details_songname">Enemy</h3>
            <h4 class="songitem__details_artistname">Imagine Dragons</h4>
        </div>

        <!-- Play/Pause Button -->
        <button class="songitem__button">
            <img class="songitem__button_icon" src="../../assets/play_icon.svg" alt="Play/Pause Icon">
        </button>
    </div>
</template>




<script>
export default {
  name: 'SongItem',
  components: {

  }
}
</script>




<style lang="scss">

    @import "../../sass/variables";
    @import "../../sass/utilityClasses";

    .songitem {

        display: flex;
        align-items: center;
        padding: 1rem;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: rgba(255, 255, 255, 0.034);
        }

        &__coverbox {

            width: 7rem;
            height: 7rem;
            border-radius: 5px;
            overflow: hidden;
            object-fit: fill;
            display: flex;
            justify-content: center;
            

            &_coverimage {
                backface-visibility: hidden;
            }
        }


        &__details {

            display: flex;
            flex-direction: column;
            margin-left: 1.5rem;
            color: $color-white;
            font-size: 1.5rem;
            line-height: normal;
            
            &_songname {
                font-weight: 400;
            }

            &_artistname {
                font-weight: 400;
                color: $color-grey-lighter;
                margin-top: 1rem;
            }
        }


        &__button {

            margin-left: auto;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background-color: $color-primary;
            transition: all 0.2s ease-in-out;

            &:hover {
                background-color: $color-primary-lighter;
            }

            &_icon {
                margin-left: 4px; // For better centering
                width: 35%;
            }
        }
    }

</style>