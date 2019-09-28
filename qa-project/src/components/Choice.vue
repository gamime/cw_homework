<!-- 選択肢コンポーネント -->
<template>
  <div class="choiceArea">
    <!-- 選択肢 -->
    <div v-on:click="clickChoice" v-bind:class="{ checked: isActive, none_click: isAnswer }" class="b-1">
      <div class="m-5">{{ choiceData.choice }}</div>
    </div>
    <!-- 回答 -->
    <span v-if="isAnswer" class="mr-5 text-b">{{ choiceData.answer }}</span>
    <span v-if="isAnswer">{{ choiceData.message }}</span>
  </div>
</template>

<script>

export default {
  name: 'choiceArea',
  props: ['choice-data','is-answer','index'],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    // 選択肢クリック処理
    clickChoice: function() {
      // 選択中に切り替え
      this.isActive = !this.isActive;

      // 【質問コンポーネント】選択個数を更新
      if (this.isActive) {
        this.$emit('updateChoiceCount', true);
      } else {
        this.$emit('updateChoiceCount', false);
      }

      // 回答の判定と設定
      if (this.isActive && this.choiceData.answer === "正解") {
        // 【質問コンポーネント】回答の正否を設定
        this.$emit('updateRightAnswerCount', true);
      } else {
        // 親コンポーネント：回答を設定
        this.$emit('updateRightAnswerCount', false);
      }
    },
    // リセット
    choiceReset: function() {
      this.isActive = false;
    }
  }
}
</script>

<style>
.checked {
  background-color: #90e4d3;
}
.none_click {
  pointer-events: none;
}
</style>
