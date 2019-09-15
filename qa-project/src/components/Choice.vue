<template>
  <div id="choiceArea">
    <!-- 選択肢 -->
    <div v-on:click="clickChoice">
      <div>{{ choiceData.choice }}</div>
    </div>
    <!-- 回答 -->
    <div v-if="isActive">
      <div>{{ choiceData.answer }}</div>
      <div>{{ choiceData.message }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'choiceArea',
  props: ['choice-data'],
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
