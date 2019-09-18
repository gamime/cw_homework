<!-- 質問コンポーネント -->
<template>
  <div class="questionArea m-5">
    <div>
      問題：{{ questionData.questionNo }}
      <div v-if="isAnswerTrue">正解</div>
      <div v-if="isAnswerFalse">不正解</div>
    </div>
    <div class="mt-5">{{ questionData.questionText }}</div> 
    <!-- 回答 -->
    <div v-for="(choiceData, index) in questionData.questionData" class="mt-5" v-bind:key="index">
      <choice-area class="mt-5" 
        v-on:setAnswer="setAnswer"
        v-bind:choice-data="choiceData"
              :is-answer="isAnswer"
              :index="index"
        ref="choiceRef" />
    </div>
  </div>
</template>

<script>
import ChoiceArea from './Choice.vue'

export default {
  name: 'questionArea',
  props: [
    'questionData',
    'isAnswer',
  ],
  data() {
    return {
      'isSelectAnswer': false,
      'isAnswerTrue': false,
      'isAnswerFalse': false
    }
  },
  components: {
    'choice-area': ChoiceArea
  },
  methods: {
    // 選択情報の追加
    setAnswer: function(isAnswer) {
      // this.answer.push(isAnswer);
      this.isSelectAnswer = isAnswer;
    },
    // 回答チェック
    checkAnswer: function() {
      // 初期表示：正誤状態を保持
      // クリック：正誤状態を更新
      if (this.isSelectAnswer) {
        this.isAnswerTrue = true;
        this.isAnswerFalse = false;
      } else {
        this.isAnswerTrue = false;
        this.isAnswerFalse = true;
      }
    },
    // リセット
    questionReset: function() {
      for (var i = 0; i < this.$refs.choiceRef.length; i++) {
        this.$refs.choiceRef[i].choiceReset();
      }
      this.isSelectAnswer = false;
      this.isAnswerTrue = false;
      this.isAnswerFalse = false;
    }
  }
}
// 問題の横に「正解」or「不正解」と表示。
// クリックしたら色をつける。
// 集計して最後の問題の後で結果を表示。
</script>

<style>
</style>
