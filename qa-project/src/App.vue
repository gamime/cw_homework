<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input @click="getQA" type="button" value="データ取得">
    <pre v-text="questionNo"></pre>
    <pre v-text="questionText"></pre>
    <pre v-text="choice"></pre>
    <pre v-text="answer"></pre>
    <pre v-text="message"></pre>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Repository from "./repositories/Repository";

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      data: '',
      questionNo: '',
      questionText: '',
      questionData: '',
      choice: '',
      answer: '',
      message: ''
    }
  },
  methods: {
    // QAデータの取得
    async getQA() {
      const {data} = await Repository.get();
      this.data = data.data;
      // 質問情報
      this.questionNo = this.data[0].questionNo;
      this.questionText = this.data[0].questionText;
      // 選択肢情報
      this.questionData = this.data[0].questionData;
      this.choice = this.questionData[0].choice;
      this.answer = this.questionData[0].answer;
      this.message = this.questionData[0].message;
    }
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
