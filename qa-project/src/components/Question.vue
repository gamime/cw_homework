<template>
  <div id="questionArea">
    <input @click="getQA" type="button" value="データ取得">
    <div class="choiceContainer">
        <!-- 質問 -->
        <div v-for="questionData in questionDatas" class="choiceItem" v-bind:key="questionData.questionNo">
            <div>{{ questionData.questionNo }}</div>
            <div>{{ questionData.questionText }}</div> 
            <!-- 回答 -->
            <div v-for="(choiceData, index) in questionData.questionData" class="choiceItem" v-bind:key="index">
              <ChoiceArea v-bind:choice-data="choiceData"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Repository from "./../repositories/Repository";
import ChoiceArea from './Choice.vue'

export default {
  name: 'questionArea',
  components: {
    ChoiceArea
  },
  data() {
    return {
      questionDatas: [],
      isActive01: false
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
