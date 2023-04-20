<template>
    <div class="userAccount__container">

        <!-- User Button -->
        <button id="userAccount" class="button userAccount" v-on:click="menuVisible=!menuVisible" title="Account Menu">
            <img class="userAccount__icon" src="../../../assets/user.svg" height="50" width="50" alt="accountMenu"/>
        </button>

        <!-- Div of options that opens/appears when button is clicked -->
        <div class="userAccount__options" :class="{accountMenu__appear:menuVisible}">
            <button class="userAccount__options_option">Account</button>
            <button @click=signOut() class="userAccount__options_option">Sign Out</button>
        </div>

    </div>
    
</template>

<script>
export default {
    name: 'AccountMenu',
    data() {
        return {
            menuVisible: false
        };
    },
    methods: {
        signOut() {
            this.$emit('signOut', false)
        }
    }
}
</script>

<style lang="scss">
    @import "../../../sass/variables";
    @import "../../../sass/utilityClasses";
    @import "../../../sass/mediaquery-manager";

    .userAccount__container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }


    #userAccount {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 5.5rem;
        width: 5.5rem;
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
        width: 70%;
        opacity: 80%;
        border: none;
        outline: none;
        transform: translateY(5px);
        transition: all .2s ease-out;

        @include respond(tabletScreen) { // Width < 1000 ?
            width: 60%;
            transform: translateY(5px);
        }
        @include respond(phoneScreen) { // Width < 450 ?
            width: 60%;
            transform: translateY(9.2px);
        }
        @include respond(phoneSmallScreen) { // Width < 300 ?
            width: 60%;
            transform: translateY(14px);
        }
        
        &:hover {
            opacity: 100%;
        }
    }


    .userAccount__options {

        display: none; // By Default
        // display: flex; // This activates when User Button is clicked
        flex-direction: column;
        align-items: flex-start;
        background-color: rgba(255, 255, 255, 0.80);
        margin-top: 1rem;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.30);

        & > *:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.099);
        }

        &_option {
            border: none;
            outline: none;
            font-size: 1.4rem;
            font-weight: 500;
            background-color: rgba(255, 255, 255, 0);
            text-align: left;
            padding: 2rem 3rem;
            color: $color-dark;
            cursor: pointer;
            transition: all .2s ease-out;

            &:hover {
                background-color: rgba(255, 255, 255, 0.6);
            }
        }
    }
    .accountMenu__appear {
        display: flex;
    }

</style>