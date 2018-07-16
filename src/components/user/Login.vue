<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <h2>Login</h2>
                <hr>
                <v-alert :value="message" type="error" transition="scale-transition">{{message}}</v-alert>
                <br>
                
                <v-form @submit.prevent="submit" v-model="valid" ref="form" lazy-validation>
                    <v-text-field v-model="username" :rules="usernameRules" label="Username"
                    required placeholder="Enter username here"></v-text-field>

                    <v-text-field v-model="password"
                    label="Password" :rules="passRules" :append-icon="showPass ? 'visibility_off' : 'visibility'" :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass"
                    required placeholder="Enter password here"></v-text-field>

                    <v-flex class="text-xs-right">
                            <v-btn type='submit' color="primary" :disabled="!valid">Submit</v-btn>
                    </v-flex>

                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
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
            message: ''
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
                .then(res => this.$router.push({name: 'App'}))
            }
        }
    }
}
</script>
