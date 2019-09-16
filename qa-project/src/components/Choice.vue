<!-- 選択肢コンポーネント -->
<template>
  <div id="choiceArea">
    <!-- 選択肢 -->
    <div v-on:click="clickChoice" class="b-1">
      <div class="m-5">{{ choiceData.choice }}</div>
    </div>
    <!-- 回答 -->
    <!-- <div v-if="isActive"> -->
    <div v-if="isAnswer">
      {{ choiceData.answer }}
      {{ choiceData.message }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'choiceArea',
  props: ['choice-data','is-answer'],
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    // 選択肢クリック処理
    clickChoice: function() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style>
</style>
