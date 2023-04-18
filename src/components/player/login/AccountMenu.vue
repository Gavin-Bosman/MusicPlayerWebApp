<template>
    <button id="userAccount" class="button button-animation-1 userAccount" title="Account Menu">
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
    #userAccount {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 6rem;
        width: 6rem;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: rgb(225, 225, 225);
        cursor: pointer;
        overflow: hidden;
        backface-visibility: hidden;
        transition: all .2s ease-out;
    }
    .userAccount__icon {
        width: 90%;
        border: none;
        outline: none;
    }

</style>