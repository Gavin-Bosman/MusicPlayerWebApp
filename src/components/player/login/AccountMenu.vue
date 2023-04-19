<template>
    <button id="userAccount" class="button userAccount" title="Account Menu">
        <img class="userAccount__icon" src="../../../assets/user.svg" height="50" width="50" alt="accountMenu"/>
    </button>
</template>

<script>
export default {
    name: 'AccountMenu'
}
</script>

<style lang="scss">
    @import "../../../sass/variables";
    @import "../../../sass/utilityClasses";
    @import "../../../sass/mediaquery-manager";


    #userAccount {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 6rem;
        width: 6rem;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: rgba(225, 225, 225, 0.533);
        cursor: pointer;
        overflow: hidden;
        backface-visibility: hidden;
        transition: all .3s ease-out;

        @include respond(tabletScreen) { // Width < 1000 ?
            height: 5rem;
            width: 5rem;
        }

        &:hover {
            background-color: rgba(225, 225, 225, 0.8);
        }
    }
    .userAccount__icon {
        width: 90%;
        border: none;
        outline: none;

        @include respond(tabletScreen) { // Width < 1000 ?
            width: 60%;
            transform: translateY(7px);
        }
        @include respond(phoneScreen) { // Width < 450 ?
            width: 60%;
            transform: translateY(9.2px);
        }
    }

</style>