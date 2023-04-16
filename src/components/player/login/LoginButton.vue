<template>
    <button @click=clicked($event) id="signupButton" class="button" ref="signup">Sign Up</button>
    <button @click=clicked($event) id="loginButton" class="button" ref="login">Login</button>

    <teleport to="body">
        <div id="loginModal" class="modal" ref="modal"> 
            <div class="modal-content">
                <div class="modal-header"> 
                    <h1 class="modal-title" v-if="modalType == 'Sign Up'">Nice To Meet You!</h1>
                    <h1 class="modal-title" v-else>Welcome Back!</h1>
                    <div class="closeContainer">
                        <button class="close" @click=close>&times;</button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="field" v-if="modalType == 'Sign Up'">
                        <div class="field-label">
                            <h1 id="emailLabel">Email:</h1>
                        </div>
                        <div class="field-body">
                            <input id="emailInput" class="input" type="text" ref="email" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="field-label">
                            <h1 id="unameLabel">Username:</h1>
                        </div>
                        <div class="field-body">
                            <input id="unameInput" class="input" type="text" ref="username" />
                        </div>
                    </div>
                    <div class="field">
                        <div class="field-label">
                            <h1 id="passwordLabel">Password:</h1>
                        </div>
                        <div class="field-body">
                            <input id="passwordInput" class="input" type="text" ref="password" />
                        </div>
                    </div>
                    <div class="submit-container">
                        <button @click=submitForm() id="submitButton" class="button">{{modalType}}</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
    export default {
        name: 'LoginButton',
        data() {
            return {
                modalType: ""
            }
        },
        methods: {
            clicked(e) {
                console.log(e.target.id);
                if(e.target.id === "signupButton") {
                    this.modalType = "Sign Up"
                } else {
                    this.modalType = "Log In"
                }
                this.$refs.modal.style = "display: block;"
            },
            close() {
                this.$refs.modal.style = "display: none;"
            },
            submitForm() {

            }
        },
    }
</script>

<style lang='scss'>
    @import "../../../sass/variables";
    @import "../../../sass/utilityClasses";

    #signupButton {
        width: 80px;
        height: 40px;
        position: relative;
        z-index: 2;

        font-size: 150%;
        background-color: $color-primary;
        padding: 5px 10px 5px 10px;
        text-align: center;

        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;

        border: none;
        cursor: pointer;

        &:hover {
            border: 2px solid $color-white;
        }
        
    }
    #loginButton {
        width: 120px;
        height: 40px;
        position: relative;
        z-index: 1;

        font-size: 150%;
        text-align:right;

        background-color: $color-primary-lighter;
        padding: 5px 15px 5px 10px;
        margin-left: -60px;

        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;

        border: none;
        cursor: pointer;

        &:hover {
            background-color: $color-primary-darker;
            border: 2px solid $color-white;
        }
    }

    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 3; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
    }

    .modal-content {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;

        background-color: #fefefe;
        margin: 10% auto; /* 15% from the top and centered */
        //padding: 20px;
        border-radius: 15px;
        width: 40%; /* Could be more or less, depending on screen size */
    }

    .closeContainer {
        display: flex;
        justify-content: right;
    }

    .close {
        color:$color-grey;
        float: right;
        font-size: 28px;
        font-weight: bold;
        border:none;
        background-color: $color-primary;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }

    .modal-body {
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        width:100%;
        display:flex;
        justify-content: center;
        padding: 15px;
        background-color: $color-primary;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .modal-title {
        flex-grow: 1;
    }

    .field {
        padding-left: 10%;
        padding-right: 10%;
    }

    .field-label {
        display:flex;
        justify-content: center;
    }

    #emailLabel, #unameLabel, #passwordLabel {
        width:70%;
        text-align: left;
    }

    #emailInput, #unameInput, #passwordInput {
        width:70%;
        font-size: large;
    }

    .submit-container {
        display: flex;
        justify-content: center;
        margin-top:20px;
        margin-bottom:10px;
        padding-left: 10%;
        padding-right: 10%;
    }

    #submitButton {
        width: 25%;
        height: 40px;
        font-size: 175%;
        font-weight: bold;

        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;

        background-color: $color-primary;
        border: none;
        cursor: pointer;

        &:hover {
            border: 2px solid black;
        }
    }


</style>