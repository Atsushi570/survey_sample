<template>
  <div class="survey-content">
    <p class="has-text-info">
      -生年月日-
      <small class="has-text-danger">{{warning}}</small>
    </p>
    <div>
      <div class="select">
        <select name="birth-year" v-model="result.year" @change="changeNotice">
          <option
            v-for="i in 70"
            :key="i"
            :value="result.startYear - i + 1"
          >{{getChoice(result.startYear -i +1)}}</option>
        </select>
      </div>
      <span>年</span>
      <div class="select">
        <select name="birth-month" v-model="result.month" @change="changeNotice">
          <option v-for="i in 12" :key="i" :value="i">{{i}}</option>
        </select>
      </div>
      <span>月</span>
      <div class="select">
        <select name="birth-date" v-model="result.date" @change="changeNotice">
          <option v-for="i in 31" :key="i" :value="i">{{i}}</option>
        </select>
      </div>
      <span>日</span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    event: 'changed'
  },
  data: function () {
    return {
      result: {}
    }
  },
  computed: {
    // 入力の年月日が初期値である0、または実際に存在しない日付が入力されていたら警告文を返す
    warning () {
      if (
        this.result.year === 0 ||
        this.result.month === 0 ||
        this.result.date === 0
      ) {
        return '無効な日付です'
      } else {
        const dt = new Date(
          this.result.year,
          this.result.month - 1,
          this.result.date
        )
        return dt.getDate() !== this.result.date ? '無効な日付です' : ''
      }
    }
  },
  props: ['content'],
  methods: {
    // 選択肢が変更されたら親コンポーネントに選択された選択肢を返すとイベントを渡す
    changeNotice () {
      this.result.isCollect = this.warning === ''
      this.$emit('changed', this.result)
    },

    // 引数で渡された西暦を元に選択肢の文字列を返す
    getChoice (year) {
      return `${year}(${this.getJapaneseCalender(year)})`
    },

    // 引数で渡された西暦に該当する和暦を返す
    getJapaneseCalender (year) {
      if (year > 2018) {
        return '令和' + (year - 2018)
      } else if (year > 1988) {
        return '平成' + (year - 1988)
      } else if (year > 1925) {
        return '昭和' + (year - 1925)
      } else if (year > 1911) {
        return '大正' + (year - 1911)
      } else if (year > 1867) {
        return '明治' + (year - 1867)
      }
    }
  },
  // propsにアクセス可能なcreatedでpropsを初期としてresultに反映する
  created () {
    this.result = this.content
  }
}
</script>

<style scoped>
.survey-content > div {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.survey-content span {
  margin-right: 2vw;
  margin-left: 1vw;
}
</style>
