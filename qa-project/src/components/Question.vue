<template>
  <div id="questionArea">
    <input @click="getQA" type="button" value="データ取得">
    <div class="choiceContainer">
        <!-- 質問 -->
        <div v-for="questionData in questionDatas" class="choiceItem">
            <div>{{ questionData.questionNo }}</div>
            <div>{{ questionData.questionText }}</div>
            <!-- 回答 -->
            <div v-for="choiceData in questionData.questionData" class="choiceItem">
                <div>{{ choiceData.choice }}</div>
                <div>{{ choiceData.answer }}</div>
                <div>{{ choiceData.message }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Repository from "./../repositories/Repository";

export default {
  name: 'app',
  data() {
    return {
      questionDatas: []
    }
  },
  methods: {
    // QAデータの取得
    async getQA() {
      const {data} = await Repository.get();
      this.questionDatas = data.data;
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

.choiceContainer {
    display: flex;
}
.choiceItem {
    border: solid;
    margin: 5px;
}
</style>
