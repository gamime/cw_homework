<template>
  <div id="app">
    <QuestionArea/>
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>
import QuestionArea from './components/Question.vue'

export default {
  name: 'app',
  components: {
    QuestionArea
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
