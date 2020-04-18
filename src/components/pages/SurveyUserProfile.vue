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
              :content="{ ...this.gender, storedResult: this.storedGender }"
              v-model="gender.result"
            ></SurveyRadio>
            <SurveyBirth
              :content="{ ...this.dateOfBirth, storedResult: this.storedDateOfBirth }"
              v-model="dateOfBirth"
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
      gender: {
        title: '-性別-',
        choices: ['男性', '女性'],
        result: ''
      },
      dateOfBirth: {
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
      return this.gender.result !== '' && this.dateOfBirth.isCollect
    },

    // storeへのアクセス
    ...mapGetters('SurveyResults', ['storedGender', 'storedDateOfBirth'])
  },

  methods: {
    // storeへ入力値をコミットしたのち、次のステップページへ遷移する
    toNextStep () {
      this.$store.commit('SurveyResults/setGender', this.gender)
      this.$store.commit('SurveyResults/setDateOfBirth', this.dateOfBirth)
      this.$router.push({ name: 'surveyUserState' })
    }
  },

  // storeにアクセス可能なcreatedでstoreに値が入っている場合はdataに反映する
  created () {
    this.gender = this.storedGender.isCommitted ? this.storedGender : this.gender
    this.dateOfBirth = this.storedDateOfBirth.isCommitted ? this.storedDateOfBirth : this.dateOfBirth
  }
}
</script>
