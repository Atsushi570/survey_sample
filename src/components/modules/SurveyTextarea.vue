<template>
  <div class="survey-content">
    <p class="has-text-info">
      {{content.title}}
      <small class="has-text-danger">{{warning}}</small>
    </p>
    <textarea
      class="textarea"
      :value="result"
      @input="changeNotice($event.target.value)"
      cols="30"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      result: ''
    }
  },
  computed: {
    warning () {
      if (this.result === '') {
        return '入力してください'
      }
    }
  },
  props: ['content'],
  methods: {
    // 選択肢が変更されたら親コンポーネントに選択された選択肢を返す
    changeNotice (value) {
      this.result = value
      this.$emit('input', this.result)
    }
  },
  // propsにアクセス可能なcreatedでpropsを初期としてresultに反映する
  created () {
    this.result = this.content.result
  }
}
</script>
