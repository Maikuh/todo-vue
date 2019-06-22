<template>
    <v-jumbotron gradient="180deg, rgba(33,150,243,1) 0%, rgba(250,250,250,1) 100%">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Welcome to the site</h3>

                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

                    <v-divider class="my-3"></v-divider>

                    <div class="title mb-3">Start writing your todos now!</div>

                    <v-btn class="mx-0" :to="{name: 'Register'}" color="primary" large>
                    Sign Up</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    },
    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      }
    }
}
</script>
