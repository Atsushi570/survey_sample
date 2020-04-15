<template>
  <div>
    <Header></Header>

    <div class="container" v-if="isProcedureCollect">
      <div class="card">
        <header class="card-header is-shadowless">
          <small class="box has-background-info has-text-white has-text-centered">STEP3</small>
          <div class="card-header-title has-text-weight-normal">
            <p>
              <font-awesome-icon icon="chalkboard-teacher" />ご依頼内容をご記入ください
            </p>
          </div>
        </header>
        <div class="card-content">
          <div class="content">
            <SurveyTextarea :content="step31" v-model="step31.result"></SurveyTextarea>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="button is-primary" @click="routerGo(-1)">
          前へ戻る
          <font-awesome-icon icon="angle-right" />
        </button>
        <button class="button is-primary" @click="toNextStep" :disabled="!validateResults">
          次へ進む
          <font-awesome-icon icon="angle-right" />
        </button>
      </div>
    </div>

    <div class="error" v-else>
      <p>不正なページ遷移を検出しました。</p>
      <div class="buttons">
        <button class="button is-primary" @click="$router.push({ name: 'step1' })">
          ホームへ戻る
          <font-awesome-icon icon="angle-right" />
        </button>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'
import Header from '../modules/Header'
import Footer from '../modules/Footer'
import SurveyTextarea from '../modules/SurveyTextarea'

export default {
  components: {
    Header,
    Footer,
    SurveyTextarea
  },

  data () {
    return {
      step31: {
        title: '-ご依頼内容-',
        result: ''
      }
    }
  },

  computed: {
    // ページ内のすべての入力が正しい場合はtrueを返す
    validateResults () {
      return this.step31.result !== ''
    },

    // storeへのアクセス
    ...mapGetters('Step2', [
      'storedResult21',
      'storedResult22',
      'storedResult23'
    ]),
    ...mapGetters('Step3', ['storedResult31']),

    // 前ページの入力が完了していればtrueを返す
    isProcedureCollect () {
      return (
        this.storedResult21 !== undefined &&
        this.storedResult22 !== undefined &&
        this.storedResult23 !== undefined
      )
    }
  },

  methods: {
    // storeへ入力値をコミットしたのち、次のステップページへ遷移する
    toNextStep () {
      this.$store.commit('Step3/setResults', {
        step31: this.step31
      })
      this.$router.push({ name: 'step4' })
    },

    // numの数だけブラウザ履歴を元にページ遷移する
    routerGo (num) {
      this.$router.go(num)
    }
  },

  created () {
    // storeに値が入っている場合はdataに反映する
    this.step31 = this.storedResult31 || this.step31
  }
}
</script>
