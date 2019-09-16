<!-- アプリケーションコンポーネント -->
<template>
  <div id="app">
    <content-area class="mainContent"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  </div>
</template>

<script>
// import QuestionArea from './components/Question.vue'
import ContentArea from './components/Content.vue'

export default {
  name: 'app',
  components: {
    // 'question-area': QuestionArea
    'content-area': ContentArea
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.mainContent {
  border: 1px solid #aaa;
  width: 80%;
  max-width: 800px;
  margin: auto;
}
.m-5 {
  margin: 5px;
}
.mt-5 {
  margin-top: 5px;
}
.b-1 {
  border: 1px solid #aaa;
}
</style>
