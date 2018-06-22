<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App'
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
