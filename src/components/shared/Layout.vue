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
                    
                    <v-btn v-if="loggedIn" flat 
                    :to="{name: 'Logout'}">Logout</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            
            <router-view></router-view>
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
            ]
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
  font-size: 24px;
}
</style>
