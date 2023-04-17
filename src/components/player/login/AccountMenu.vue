<template>
    <button id="userAccount" class="button button-animation-1">
        <img src="../../../assets/user.png" height="50" width="50" alt="accountMenu"/>
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
        align-items: center;
        height: 48px;
        width: 48px;
        border: none;
        border-radius: 50%;
        background-color: $color-primary;
        cursor:pointer;
    }
</style>