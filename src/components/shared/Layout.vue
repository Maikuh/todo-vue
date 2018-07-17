<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer temporary v-model="drawer"
            light absolute class="white">
                <v-toolbar flat>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title class="title">
                                Todos
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>

                <v-list dense>
                    <v-list-tile v-for="item in navleft" :key="item.title"
                    @click="" :to="item.link">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{item.title}}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile v-if="!loggedIn" v-for="item in navright" :key="item.title"
                    @click="" :to="item.link">
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{item.title}}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile v-if="loggedIn" @click="" :to="{name: 'Logout'}">
                        <v-list-tile-action>
                            <v-icon>exit_to_app</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>
                                Logout
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>

            <v-toolbar class="blue">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-toolbar-title>Todos</v-toolbar-title>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn v-for="(item, index) in navleft" :key="index" flat :to="item.link">{{item.title}}</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                
                <v-toolbar-items class="hidden-sm-and-down">
                    <!-- <v-btn to="/" flat>Home</v-btn>
                    <v-btn flat>Register</v-btn>
                    <v-btn flat>Login</v-btn> -->
                    <v-btn v-if="!loggedIn" v-for="(item, index) in navright" :key="index" flat :to="item.link">{{item.title}}</v-btn>
                    
                    <v-menu v-if="loggedIn" :close-on-content-click="false"
                     offset-y>
                        <v-btn slot="activator" flat>
                            <v-icon large>person</v-icon>
                        </v-btn>

                        <v-card>
                            <v-list>
                                <v-list-tile avatar>
                                    <v-list-tile-avatar>
                                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{name}}</v-list-tile-title>
                                        <v-list-tile-sub-title>@{{username}}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-divider></v-divider>
                        </v-card>
                    </v-menu>

                    <v-btn v-if="loggedIn" flat 
                    :to="{name: 'Logout'}">Logout</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            
            <v-dialog v-model="dialog" hide-overlay persistent width="300">
                <v-card color="primary" dark>
                    <v-card-text>Please stand by
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <transition name="router-anim"
            mode="out-in">
                <router-view></router-view>
            </transition>
        </v-app>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            navleft: [
                { title: 'Home', icon: 'home', link: '/' },
                { title: 'About', icon: 'info', link: '/about' },
                // { title: 'Todos', icon: 'check_box', link: '/todo' }
            ],
            navright: [
                {title: 'Register', icon:'', link: '/register'},
                {title: 'Login', icon:'', link: '/login'},
            ],
            name: '',
            username: ''
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        dialog() {
            return this.$store.getters.dialog
        }
    },
    created() {
        if (this.loggedIn) {
            this.getUserInfo()            
        }
    },
    watch: {
        loggedIn() {
            this.getUserInfo()
        }
    },
    methods: {
        getUserInfo() {
            this.$store.dispatch('getUserInfo')
            .then(res => {
                this.name = res.data.name
                this.username = res.data.username
            })
            .catch(err => console.log(err.response))
        }
    }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 24px;
}

.router-anim-enter-active, .router-anim-leave-active {
  transition: opacity .3s ease;
}
.router-anim-enter, .router-anim-leave-to {
  opacity: 0;
}
</style>
