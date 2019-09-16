<!-- 質問コンポーネント -->
<template>
  <div id="questionArea" class="m-5">
    <div>問題：{{ questionData.questionNo }}</div>
    <div class="mt-5">{{ questionData.questionText }}</div> 
    <!-- 回答 -->
    <div v-for="(choiceData, index) in questionData.questionData" class="mt-5" v-bind:key="index">
      <choice-area v-bind:choice-data="choiceData" :is-answer="isAnswer" class="mt-5"/>
    </div>
  </div>
</template>

<script>
import ChoiceArea from './Choice.vue'

export default {
  name: 'questionArea',
  props: ['question-data','is-answer'],
  components: {
    'choice-area': ChoiceArea
  }
}
</script>

<style>
</style>
