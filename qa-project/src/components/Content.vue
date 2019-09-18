<!-- メインコンテンツコンポーネント -->
<template>
  <div id="contentArea">
    <input v-if="questionDatas.length<=0" @click="getData" type="button" value="データ取得" class="content m-5">
    <div v-if="questionDatas.length>0" class="m-5">
      <!-- <div v-for="(questionData, index) in questionDatas" v-bind:key="questionData.questionNo"> -->
        <!-- 質問 -->
        <question-area
          v-bind:question-data="questionDatas[activNo-1]"
                :is-answer="isAnswer"
          ref="questionRef" />
      <!-- </div> -->
    </div>
    <!-- フッダ -->
    <div class="footer">
        <button v-if="questionDatas.length>0" @click="backQuestion" class="m-5">前へ</button>
        {{ activNo }}／{{ questionDatas.length }}問
        <button v-if="questionDatas.length>0" @click="checkAnswer" class="m-5">回答</button>
        <button v-if="questionDatas.length>0" @click="nextQuestion" class="m-5">次へ</button>
    </div>
  </div>
</template>

<script>
import Repository from "./../repositories/Repository";
import QuestionArea from './Question.vue'

export default {
  name: 'contentArea',
  components: {
    'question-area': QuestionArea
  },
  data() {
    return {
      questionDatas: [],
      activNo: 1,
      maxNo: 0,
      isAnswer: false,
    }
  },
  methods: {
    async getData() {
      // データ取得
      const {data} = await Repository.get();
      this.questionDatas = data.data;
      this.maxNo = this.questionDatas.length;
    },
    checkAnswer: function() {
        // 回答を表示
        this.isAnswer = !this.isAnswer;
        if (this.isAnswer) {
            // 正誤を判定
            this.$refs.questionRef.checkAnswer();
        } else {
            // リセット
            this.$refs.questionRef.questionReset();
        }
    },
    backQuestion: function() {
        if (this.maxNo <= this.activNo) {
            this.activNo = this.activNo-1;
            this.isAnswer = false;
            // 状態リセット
            this.$refs.questionRef.questionReset();
        }
    },
    nextQuestion: function() {
        if (this.maxNo > this.activNo) {
            this.activNo = this.activNo+1;
            this.isAnswer = false;
            // 状態リセット
            this.$refs.questionRef.questionReset();
        }
    }
  }
}
</script>

<style>
#contentArea {
    display: flex;
    flex-direction: column;
    min-height: calc(90vh - 16px);
}
/* .content {
    display: flex;
    flex-direction: column;
    max-height: 50px;
} */
.footer {
    margin-top: auto;
    position: fixed;
    top: calc(90vh - 16px - 25px);
    z-index: 24;
}
</style>
