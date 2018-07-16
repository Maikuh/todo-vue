<template>
    <div id="app">
        <v-navigation-drawer temporary v-model="drawer"
        :mini-variant="mini" light absolute class="white">
            <v-list dense>
                <v-list-tile v-for="item in items" :key="item.title"
                @click="" :href="item.link">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{item.title}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar class="blue">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Todos</v-toolbar-title>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-for="(item, index) in 2" :key="index" flat :to="navleft[index].link">{{navleft[index].title}}</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            
            <v-toolbar-items class="hidden-sm-and-down">
                <!-- <v-btn to="/" flat>Home</v-btn>
                <v-btn flat>Register</v-btn>
                <v-btn flat>Login</v-btn> -->
                    <v-btn v-for="(item, index) in 2" :key="index" flat :to="navright[index].link">{{navright[index].title}}</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            navleft: [
                { title: 'Home', icon: 'home', link: '/' },
                { title: 'Todos', icon: 'check_box', link: '/todo' }
            ],
            navright: [
                {title: 'Register', icon:'', link: '/register'},
                {title: 'Login', icon:'', link: '/login'},
            ]
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
