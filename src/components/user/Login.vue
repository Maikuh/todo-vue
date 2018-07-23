<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
                <h2>Login</h2>
                <hr>
                <v-alert :value="message" type="error" transition="fade-transition">{{message}}</v-alert>
                <v-alert :value="successMsg" type="success" transition="fade-transition">{{successMsg}}</v-alert>
                <br>
                
                <v-form @keyup.native.enter="submit" v-model="valid" ref="form" lazy-validation>
                    <v-text-field v-model="username" :rules="usernameRules" label="Username"
                    required placeholder="Enter username here"></v-text-field>

                    <v-text-field class="my-4" v-model="password"
                    label="Password" :rules="passRules" :append-icon="showPass ? 'visibility_off' : 'visibility'" :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                    required placeholder="Enter password here"></v-text-field>

                    <v-flex class="text-xs-right">
                        <v-btn :loading="loading" @click="submit" color="primary" :disabled="!valid">Submit</v-btn>
                    </v-flex>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: {
        successMsg: {
            type: String
        }
    },
    data() {
        return {
            valid: false,
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 4 || 'Username must be at least 4 characters'
            ],
            password: '',
            passRules: [
                v => !!v || 'Password is required',
                v => v.length >= 4 || 'Password must be at least 6 characters'
            ],
            showPass: false,
            message: '',
            loading: false
        }
    },
    methods: {
        submit() {
            let validated = this.$refs.form.validate()
            
            if (validated) {
                this.$store.dispatch('getToken', {
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    this.loading = true
                    this.$router.push({name: 'App'})
                    this.$store.commit('loading', true)
                })
                .catch(err => {
                    this.message = err.data.message
                    this.password = ''
                })
            }
        }
    }
}
</script>
