<!-- 質問コンポーネント -->
<template>
  <div class="questionArea m-5">
    <div>
      質問：{{ questionData.questionNo }}
      <div class="text-b" v-if="isAnswerTrue">正解</div>
      <div class="text-b" v-if="isAnswerFalse">不正解</div>
    </div>
    <div class="mt-5 text-b">{{ questionData.questionText }}</div> 
    <!-- 回答 -->
    <choice-area class="mt-5"
      v-for="(choiceData, index) in questionData.questionData"
      v-bind:key="index"
            :choice-data="choiceData"
            :is-answer="isAnswer"
            :index="index"
      v-on:updateRightAnswerCount="updateRightAnswerCount"
      v-on:updateChoiceCount="updateChoiceCount"
      ref="choiceRef" />
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
  components: {
    'choice-area': ChoiceArea
  },
  data() {
    return {
      // 質問の正当数
      'rightNum': 0,
      // 回答の正当数
      'rightSelectNum': 0,
      // 正解フラグ
      'isAnswerTrue': false,
      // 不正解フラグ
      'isAnswerFalse': false,
      // 選択個数
      'activeCount': 0
    }
  },
  methods: {
    // 正当数の設定
    setRightNum: function() {
      var questions = this.questionData.questionData;

      this.rightNum = 0;
      for (var i=0; questions.length>i; i++) {
        if (questions[i].answer == "正解") {
          this.rightNum++;
        }
      }
      console.log('初期表示のrightNum', this.rightNum);
    },
    // 回答の正否を設定
    updateRightAnswerCount: function(isAnswer) {
      if (isAnswer) {
        // 正解の場合、回答の正当数をプラス
        this.rightSelectNum++;
      } else if (!isAnswer && this.rightSelectNum > 0) {
        // 不正解、かつ、回答の正当数がゼロより大きい場合、マイナス
        this.rightSelectNum--;
      }
    },
    // 選択肢の選択状態を設定
    updateChoiceCount: function(isActive) {
      if (isActive) {
        // 選択中
        this.activeCount++;
      } else {
        // 未選択
        this.activeCount--;
      }
      if (this.activeCount == 0) {
        // 選択なしの場合、回答ボタンを非活性
        this.$emit('setAnswerButton', true);
      } else {
        // 選択ありの場合、回答ボタンを活性
        this.$emit('setAnswerButton', false);
      }
    },
    // 回答チェック
    checkAnswer: function() {
      // 正当数を設定
      this.setRightNum();
      if (this.rightNum == this.rightSelectNum) {
        // 質問の正当数=選択した正当数の場合、正解
        this.isAnswerTrue = true;
        this.isAnswerFalse = false;
      } else {
        // 質問の正当数=選択した正当数の場合、不正解
        this.isAnswerTrue = false;
        this.isAnswerFalse = true;
      }
    },
    // リセット
    questionReset: function() {
      for (var i = 0; i < this.$refs.choiceRef.length; i++) {
        this.$refs.choiceRef[i].choiceReset();
      }
      this.rightSelectNum = 0;
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
