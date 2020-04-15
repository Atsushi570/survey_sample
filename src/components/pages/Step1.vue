<template>
  <div>
    <Header></Header>

    <div class="container">
      <div class="card">
        <header class="card-header is-shadowless">
          <small class="box has-background-info has-text-white has-text-centered">STEP1</small>
          <div class="card-header-title has-text-weight-normal">
            <p>
              <font-awesome-icon icon="chalkboard-teacher" />お客様の情報を入力してください
            </p>
          </div>
        </header>
        <div class="card-content">
          <div class="content">
            <SurveyRadio
              :content="{...this.step11, storedResult:this.storedResult11}"
              v-model="step11.result"
            ></SurveyRadio>
            <SurveyBirth
              :content="{...this.step12, storedResult:this.storedResult12}"
              v-model="step12"
            ></SurveyBirth>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="button is-primary" @click="toNextStep" :disabled="!validateResults">
          次へ進む
          <font-awesome-icon icon="angle-right" />
        </button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import SurveyRadio from '../modules/SurveyRadio'
import SurveyBirth from '../modules/SurveyBirth'

export default {
  components: {
    Header,
    Footer,
    SurveyRadio,
    SurveyBirth
  },

  data: function () {
    return {
      step11: {
        title: '-性別-',
        choices: ['男性', '女性'],
        result: ''
      },
      step12: {
        year: 0,
        month: 0,
        date: 0,
        isCollect: false,
        startYear: new Date().getFullYear()
      }
    }
  },

  computed: {
    // ページ内のすべての入力が正しい場合はtrueを返す
    validateResults () {
      return this.step11.result !== '' && this.step12.isCollect
    },

    // storeへのアクセス
    ...mapGetters('Step1', ['storedResult11', 'storedResult12'])
  },

  methods: {
    // storeへ入力値をコミットしたのち、次のステップページへ遷移する
    toNextStep () {
      this.$store.commit('Step1/setResults', {
        step11: this.step11,
        step12: this.step12
      })
      this.$router.push({ name: 'step2' })
    }
  },

  // storeにアクセス可能なcreatedでstoreに値が入っている場合はdataに反映する
  created () {
    this.step11 = this.storedResult11 || this.step11
    this.step12 = this.storedResult12 || this.step12
  }
}
</script>
