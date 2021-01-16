<template>
  <div id="app">
    <HomeScreen/>
  </div>
</template>

<script>
import HomeScreen from './components/HomeScreen.vue'

export default {
  name: 'App',
  components: {
    HomeScreen
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
