<template>
    <button @click=clicked($event) id="signupButton" class="button" ref="signup">Sign Up</button>
    <button @click=clicked($event) id="loginButton" class="button" ref="login">Login&nbsp;&nbsp;</button>

    <teleport to="body">
        <div id="loginModal" class="modal" ref="modal"> 
            <div class="modal-content">
                <div class="modal-header"> 
                    <h1 class="modal-title" v-if="modalType == 'Sign Up'">Nice To Meet You!</h1>
                    <h1 class="modal-title" v-else>Welcome Back!</h1>
                    <div class="closeContainer">
                        <button class="close" @click=close(modalType)>&times;</button>
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
                        <div class="field-label" v-if="newEmailErr">
                            <h2 class="errorMessage">Please Enter a Valid Email Address</h2>
                        </div>
                    </div>
                    <div class="field">
                        <div class="field-label">
                            <h1 id="unameLabel">Username:</h1>
                        </div>
                        <div class="field-body">
                            <input id="unameInput" class="input" type="text" ref="username" />
                        </div>
                        <div class="field-label" v-if="newUnameErr">
                            <h2 class="errorMessage">{{unameErrMsg}}</h2>
                        </div>
                        <div class="field-label" v-if="loginUserErr">
                            <h2 class="errorMessage">{{unameErrMsg}}</h2>
                        </div>
                    </div>
                    <div class="field">
                        <div class="field-label">
                            <h1 id="passwordLabel">Password:</h1>
                        </div>
                        <div class="field-body">
                            <input id="passwordInput" class="input" type="text" ref="password" />
                        </div>
                        <div class="field-label" v-if="newPassErr">
                            <h2 class="errorMessage">Please Enter a Password That Is:</h2>
                            <ul id="passErrList">
                                <li>8-15 Characters Long</li>
                                <li>Contains At Least 1 Capital Letter</li>
                                <li>Contains At Least 1 Special Character</li>
                                <li>Contains At Least 1 Number</li>
                            </ul>
                        </div>
                        <div class="field-label" v-if="loginPassErr">
                            <h2 class="errorMessage">Username And Password Do Not Match</h2>
                        </div>
                    </div>
                    <div class="submit-container">
                        <button v-if="modalType == 'Sign Up'" @click=signUp() id="submitButton" class="button">{{modalType}}</button>
                        <button v-else @click=logIn() id="submitButton" class="button">{{modalType}}</button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'LoginButton',
        data() {
            return {
                modalType: "",
                newEmailErr: false,
                newUnameErr: false,
                newPassErr: false,
                loginPassErr: false,
                loginUserErr: false,
                unameErrMsg: ""
            }
        },
        methods: {
            clicked(e) {
                if(e.target.id === "signupButton") {
                    this.modalType = "Sign Up"
                } else {
                    this.modalType = "Log In"
                }
                this.$refs.modal.style = "display: block;"
            },
            close(modalType) {
                this.$refs.modal.style = "display: none;"

                if (modalType == "Sign Up") {
                    this.$refs.email.value = "";
                    this.$refs.username.value = "";
                    this.$refs.password.value = "";
                    this.newEmailErr = false;
                    this.newUnameErr = false; 
                    this.newPassErr = false;
                } else if (modalType == "Log In") {
                    this.$refs.username.value = "";
                    this.$refs.password.value = "";
                    this.loginUserErr = false;
                    this.loginPassErr = false;
                }
            },
            validateEmail(email) {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i; // eslint-disable-line
                if (pattern.test(email)) {
                    return true;
                }
                return false;
            },
            validatePassword(password) {
                let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/; // eslint-disable-line
                if (pattern.test(password)) {
                    return true;
                }
                return false;
            },
            async validateUserName(username) {
                let pattern = /[a-zA-Z]/ // eslint-disable-line

                if (username.length < 3) {
                    this.unameErrMsg = "Please Input a Username With At Least Three Characters";
                    return true;
                } else if (!pattern.test(username)) {
                    this.unameErrMsg = "Please Input a Username With At Least One Letter";
                    return true;
                }

                let response = null;
                await axios.get(`http://localhost:5000/api/users/userName/${username}`)
                    .then((res) => {
                        //console.log(res.data);
                        response = res.data;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                
                if (response != null && this.modalType == "Sign Up") {
                    this.unameErrMsg = "Sorry, That Username Is Already Taken";
                } else if (response != null && this.modalType == "Log In") {
                    this.unameErrMsg = "Invalid Username";
                }

                return response;
            },
            async signUp() {
                this.newUnameErr = false;
                this.newEmailErr = false;
                this.newPassErr = false;

                let exit = false;
                let email = this.$refs.email.value;
                let uname = this.$refs.username.value;
                let pass = this.$refs.password.value;

                let account = await this.validateUserName(uname);

                if (account !== null) {
                    this.newUnameErr = true;
                    exit = true;
                }
                if (!this.validateEmail(email)) {
                    this.newEmailErr = true;
                    exit = true;
                } 
                if (!this.validatePassword(pass)) {
                    this.newPassErr = true;
                    exit = true;
                } 

                if (exit) {
                    return;
                }

                let userAccount = {"email":email, "username":uname, "password":pass}

                await axios.post('http://localhost:5000/api/users', userAccount)
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                
                this.$emit('LogIn', uname);
                this.close(this.modalType);
            }, 
            async logIn() {
                this.loginUserErr = false;
                this.loginPassErr = false;
                let uname = this.$refs.username.value;
                let pass = this.$refs.password.value;
                let account = await this.validateUserName(uname);

                if (account === null) {
                    this.loginUserErr = true;
                    return;
                }

                if (account.password != pass) {
                    this.loginPassErr = true;
                    return;
                    
                } else {
                    this.$emit('LogIn', account.username);
                    console.log(`Logged in: ${account.username}`);
                }

                this.close(this.modalType);
            }
        },
    }
</script>

<style lang='scss'>
    @import "../../../sass/variables";
    @import "../../../sass/utilityClasses";
    @import "../../../sass/mediaquery-manager";

    #signupButton {

        font-family: 'Ubuntu', sans-serif;
        font-weight: 400; //Regular
        font-size: 1.6rem;
        letter-spacing: 0.5px;

        width: 12rem;
        height: 5rem;
        z-index: 2;

        background-color: $color-white;
        color: $color-grey-darker;
        padding: 5px 10px;
        text-align: center;

        border-radius: 25px;

        border: none;
        cursor: pointer;

        transition: all .3s ease-out;

        @include respond(tabletSmallScreen) { // Width < 650 ?
            font-size: 1.4rem;
            width: 8.4rem;
            height: 3.5rem;
        }
        @include respond(phoneScreen) { // Width < 450 ?
            font-size: 1.4rem;
            width: 9.4rem;
            height: 3.5rem;
        }

        &:hover {
            background-color: $color-grey-dark;
            color: rgb(205, 205, 205);
        }
        &:active {
            background-color: $color-dark;
        }
        
    }
    #loginButton {

        font-family: 'Ubuntu', sans-serif;
        font-weight: 400; //Regular

        width: 14.5rem;
        height: 5rem;
        z-index: 1;

        font-size: 1.6rem;
        letter-spacing: 0.5px;
        text-align: right;

        background-color: $color-grey-darker;
        color: $color-white;
        padding: 5px 15px;
        margin-left: -60px;

        border-radius: 25px;

        border: none;
        cursor: pointer;

        transition: all .3s ease-out;


        @include respond(tabletSmallScreen) { // Width < 650 ?
            font-size: 1.4rem;
            width: 10rem;
            height: 3.5rem;
            margin-left: -35px;
        }
        @include respond(phoneScreen) { // Width < 450 ?
            font-size: 1.4rem;
            width: 11rem;
            height: 3.5rem;
            margin-left: -25px;
        }

        &:hover {
            background-color: $color-grey-dark;
            color: $color-grey-lighter;
        }
    }

    .modal {
        font-family: 'Ubuntu', sans-serif !important;
        font-weight: 400 !important;

        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 4; /* Sit on top */
        left: 0;
        top: 0;
        width: 100vw; /* Full width */
        height: 100vh; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
    }

    .modal-content {

        display: flex;
        position: fixed;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;

        background-color: $color-dark;
        box-shadow: 0 0 30px 0px black;
        border-radius: 10px;
        

        @include respond(tabletScreen) { // Width < 1000 ?
            width: 80%;
            left: 45%;
        }
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
        padding: 4rem 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: scroll;
        height: min-content;

        @include respond(tabletScreen) { // Width < 1000 ?
            height: 45rem;
        }
    }

    .modal-header {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px 10%;
        background-color: $color-primary;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .modal-title {
        flex-grow: 1;
        font-family: 'Ubuntu', sans-serif !important;
        font-weight: 500 !important;
    }

    .field {
        padding-left: 10%;
        padding-right: 10%;
    }

    .field-label {
        display:flex;
        flex-direction: column;
        justify-content: center;
    }

    #emailLabel, #unameLabel, #passwordLabel {
        font-family: 'Ubuntu', sans-serif !important;
        font-size: 1.6rem;
        font-weight: 300 !important;
        line-height: normal;
        color: rgb(214, 214, 214);

        width:70%;
        text-align: left;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    #emailInput, #unameInput, #passwordInput {
        font-family: 'Ubuntu', sans-serif !important;
        font-weight: 400 !important;

        width: 100%;
        height: 4rem;
        text-align: left;
        font-size: 1.6rem;
        border-radius: 5px;
        padding-left: 15px;
        background-color: $color-grey-dark;
        border: none;
        color: rgb(219, 219, 219);
        transition: all .3s ease-out;

        &:hover {
            background-color: rgb(44, 44, 44);
        }
        &:focus {
            background-color: white;
            outline: none;
            color: $color-dark;
        }
        
        &::placeholder {
            color: rgb(117, 117, 117);
        }
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
        font-family: "Ubuntu", sans-serif !important;
        font-weight: 400 !important;
        width: 21rem;
        height: 5rem;
        font-size: 1.8rem;
        font-weight: 500;
        border-radius: 5px;
        background-color: #69FFE8;
        border: none;
        cursor: pointer;
        margin-top: 2rem;
        transition: all .3s ease-out;

        &:hover {
            background-color: $color-primary-lighter;
        }
        &:active {
            background-color: $color-primary-darker;
        }
    }

    .errorMessage {
        font-family: 'Ubuntu', sans-serif !important;
        font-weight: 400 !important;
        font-size: 1.6rem;

        color: rgb(255, 67, 67);
        text-align: left;
    }

    #passErrList {
        font-family: 'Ubuntu', sans-serif !important;
        font-weight: 400 !important;
        text-decoration: none;
        font-size: 1.6rem !important;

        color: rgb(255, 67, 67);
        text-align: left;
    }

</style>