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
          v-on:setAnswerButton="setAnswerButton"
          ref="questionRef" />
      <!-- </div> -->
    </div>
    <!-- フッダ -->
    <div class="footer">
        <button v-if="questionDatas.length>0" @click="backQuestion" v-bind:disabled="isDisabledBackButton" class="m-5">前へ</button>
        {{ activNo }}／{{ questionDatas.length }}問
        <button v-if="questionDatas.length>0" @click="checkAnswer" v-bind:disabled="isDisabledAnswerButton" class="m-5">回答を確認する</button>
        <button v-if="questionDatas.length>0" @click="nextQuestion" v-bind:disabled="isDisabledNextButton" class="m-5">次へ</button>
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
      isDisabledBackButton: true,
      isDisabledAnswerButton: true,
      isDisabledNextButton: false
    }
  },
  methods: {
    async getData() {
      // データ取得
      const {data} = await Repository.get();
      this.questionDatas = data.data;
      this.maxNo = this.questionDatas.length;
    },
    // 「回答を確認する」ボタンクリック処理
    checkAnswer: function() {
        // 回答を表示
        this.isAnswer = !this.isAnswer;
        if (this.isAnswer) {
            // 【子コンポーネント】正誤を判定
            this.$refs.questionRef.checkAnswer();
        } else {
            // リセット
            this.resetContent();
        }
        this.isDisabledAnswerButton = true;
    },
    // 「前へ」ボタンクリック処理
    backQuestion: function() {
        if (this.activNo <= this.maxNo) {
            this.activNo = this.activNo-1;
            this.isAnswer = false;
            if (this.activNo == 1) {
              // 質問１の場合、非活性
              this.isDisabledBackButton = true;
            }
            this.isDisabledNextButton = false;
            // 状態リセット
            this.resetContent();
        }
    },
    // 「次へ」ボタンクリック処理
    nextQuestion: function() {
        if (this.activNo < this.maxNo) {
            this.activNo = this.activNo+1;
            this.isAnswer = false;
            this.isDisabledBackButton = false;
            if (this.maxNo == this.activNo) {
                // 最終の質問の場合、非活性
                this.isDisabledNextButton = true;
            }
            // 状態リセット
            this.resetContent();
        }
    },
    // 回答ボタンの活性非活性制御
    setAnswerButton: function(isDisabled) {
      // 回答の活性状態を設定
      this.isDisabledAnswerButton = isDisabled;
    },
    resetContent: function() {
        // 回答ボタン：OFF
        this.setAnswerButton(true);
        // 【子コンポーネント】質問リセット
        this.$refs.questionRef.questionReset();
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
