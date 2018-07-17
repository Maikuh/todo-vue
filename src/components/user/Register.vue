<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <h2>Register</h2>
                <hr>
                <v-alert :value="message" type="warning" transition="fade-transition">{{message}}</v-alert>
                <br>
                
                <v-form @keyup.native.enter="submit" v-model="valid" ref="form" lazy-validation>
                    <v-text-field v-model="name" :counter="10"
                    label="Name" required placeholder="Enter name here"></v-text-field>

                    <v-text-field class="my-4" v-model="email"
                    :rules="emailRules" label="E-mail"
                    required placeholder="johndoe@example.com"></v-text-field>

                    <v-text-field class="my-4" v-model="username"
                    :rules="usernameRules" label="Username"
                    required placeholder="Enter username here"></v-text-field>

                    <v-text-field class="my-4" v-model="password"
                    :rules="passRules" label="Password" :append-icon="show1 ? 'visibility_off' : 'visibility'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1"
                    required placeholder="Enter password here"></v-text-field>

                    <v-text-field class="my-4" v-model="checkPass"
                    :rules="checkPassRules" label="Repeat Password" :append-icon="show2 ? 'visibility_off' : 'visibility'" :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2"
                    required placeholder="Repeat above password" ></v-text-field>

                    <v-flex class="text-xs-right">
                        <v-btn :loading="loading" @click="submit" color="primary" :disabled="!valid">Submit</v-btn>
                    </v-flex>

                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            valid: false,
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 4 || 'Username must be at least 4 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            name: '',
            password: '',
            passRules: [
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters'
            ],
            checkPass: '',
            checkPassRules: [
                v => v == this.password || 'Passwords do not match'
            ],
            show1: false,
            show2: false,
            message: '',
            loading: false
        }
    },
    methods: {
        submit() {
            let validated = this.$refs.form.validate()
            
            if (validated) {
                axios.post('/users/register', {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(res => { 
                    console.log(res)
                    
                    this.message = ''
                    this.$router.push(
                        {
                            name: 'Login',
                            params: {
                                successMsg: 'Registered successfully. You can now log in'
                            }
                        }
                    )
                })
                .catch(err => {
                    console.log(err.response)
                    this.message = err.response.data.message
                })
            }
        }
    }
}
</script>
