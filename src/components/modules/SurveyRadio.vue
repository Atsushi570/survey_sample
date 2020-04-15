<template>
  <div class="survey-content">
    <p class="has-text-info">
      {{content.title}}
      <small class="has-text-danger">{{warning}}</small>
    </p>
    <div class="radios">
      <div v-for="choice in content.choices" :key="choice">
        <input
          type="radio"
          :name="content.title"
          :id="content.title+choice"
          :value="choice"
          v-model="result"
          @change="changeNotice"
          :checked="applyStoredState(choice)"
        />
        <label :for="content.title+choice">{{choice}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   *親コンポーネントから以下のオブジェクトを受け取る
      <オブジェクト名>: {
        title: 質問内容,
        choices: 選択肢の配列,
        result: storeに回答がある場合は回答内容、ない場合は''
      }
   */
  model: {
    event: 'changed'
  },
  data: function () {
    return {
      result: ''
    }
  },
  computed: {
    warning () {
      if (this.result === '') {
        return '選択してください'
      }
    }
  },
  props: ['content'],
  methods: {
    // 選択肢が変更されたら親コンポーネントに選択された選択肢を返す
    changeNotice () {
      this.$emit('changed', this.result)
    },
    // 親コンポーネントから受け取った結果に基づき、storeに回答がある場合はラジオボタンに反映する
    applyStoredState (choice) {
      return choice === this.content.result
    }
  },
  // propsにアクセス可能なcreatedでpropsを初期としてresultに反映する
  created () {
    this.result = this.content.result
  }
}
</script>

<style scoped>
.radios {
  display: flex;
  flex-direction: row;
}
.radios > div:not(:first-child) {
  margin-left: 2vw;
}
</style>
