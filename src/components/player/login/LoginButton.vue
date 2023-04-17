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
                            <h2 class="errorMessage">Sorry, That Username Is Taken</h2>
                        </div>
                        <div class="field-label" v-if="loginUserErr">
                            <h2 class="errorMessage">Invalid Username</h2>
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
                            <h2 class="errorMessage">Please Enter a Password that is:</h2>
                            <ul id="passErrList">
                                <li>8-15 Characters Long</li>
                                <li>Contains at least 1 Capital Letter</li>
                                <li>Contains at least 1 Special Character</li>
                                <li>Contains at least 1 Number</li>
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
            close() {
                this.$refs.modal.style = "display: none;"
            },
            validateEmail(email) {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i; // eslint-disable-line
                if (pattern.test(email)) {
                    return true;
                }
                return false;
            },
            validatePassword(password) {
                let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ // eslint-disable-line
                if (pattern.test(password)) {
                    return true;
                }
                return false;
            },
            async validateUserName(username) {
                let response = null;
                await axios.get(`http://localhost:5000/api/users/userName/${username}`)
                    .then((res) => {
                        //console.log(res.data);
                        response = res.data;
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                return response;
            },
            async signUp() {
                let exit = false;
                let email = this.$refs.email.value;
                let uname = this.$refs.username.value;
                let pass = this.$refs.password.value;

                if (await this.validateUserName(uname) !== null) {
                    this.unameErr = true;
                    exit = true;
                }
            
                if (!this.validateEmail(email)) {
                    this.emailErr = true;
                    exit = true;
                } else {
                    this.emailErr = false;
                }
                if (!this.validatePassword(pass)) {
                    this.passErr = true;
                    exit = true;
                } else {
                    this.passErr = false;
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
                
                this.$refs.email.value = "";
                this.$refs.username.value = "";
                this.$refs.password.value = "";
                this.close();
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

                this.$refs.username.value = "";
                this.$refs.password.value = "";
                this.close();
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
        width: 50%; /* Could be more or less, depending on screen size */
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
        flex-direction: column;
        justify-content: center;
    }

    #emailLabel, #unameLabel, #passwordLabel {
        width:70%;
        text-align: left;
    }

    #emailInput, #unameInput, #passwordInput {
        width:70%;
        font-size: large;
        border-radius: 10px;
        padding-left: 5px;
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

    .errorMessage {
        width:70%;
        text-align: left;
    }

    #passErrList {
        text-align: left;
        font-size: medium;
    }

</style>