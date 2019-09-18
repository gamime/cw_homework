<!-- 選択肢コンポーネント -->
<template>
  <div class="choiceArea">
    <!-- 選択肢 -->
    <div v-on:click="clickChoice" v-bind:class="{ checked: isActive }" class="b-1">
      <div class="m-5">{{ choiceData.choice }}</div>
    </div>
    <!-- 回答 -->
    <div v-if="isAnswer">
      {{ choiceData.answer }}
      {{ choiceData.message }}
    </div>
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
      // 親コンポーネント：回答を設定
      if (this.choiceData.answer === "正解" && this.isActive) {
        this.$emit('setAnswer', true);
      } else {
        this.$emit('setAnswer', false);
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
</style>
