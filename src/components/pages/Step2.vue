<template>
  <div>
    <Header></Header>

    <div class="container" v-if="isProcedureCollect">
      <div class="card">
        <header class="card-header is-shadowless">
          <small class="box has-background-info has-text-white has-text-centered">STEP2</small>
          <div class="card-header-title has-text-weight-normal">
            <p>
              <font-awesome-icon icon="chalkboard-teacher" />以下にお答えください。
            </p>
          </div>
        </header>
        <div class="card-content">
          <div class="content">
            <SurveyRadio
              :content="{...this.step21, storedResult: this.storedResult21}"
              v-model="step21.result"
            ></SurveyRadio>
            <SurveyRadio
              :content="{...this.step22, storedResult:this.storedResult22}"
              v-model="step22.result"
              v-if="step21.result !== ''"
            ></SurveyRadio>
            <SurveyRadio
              :content="{...this.step23, storedResult:this.storedResult23}"
              v-model="step23.result"
              v-if="step22.result !== ''"
            ></SurveyRadio>
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
      step21: {
        title: '現在、生命保険に加入されていますか？',
        choices: ['はい', 'いいえ'],
        result: ''
      },
      step22: {
        title:
          '現在入院中ですか？または、最近3か月以内に医師の診療・検査の結果、入院・手術を勧められたことはありますか？',
        choices: ['はい', 'いいえ'],
        result: ''
      },
      step23: {
        title:
          '過去5年以内に、病気やけがで、手術を受けたことまたは継続して7日以上の入院をしたことがありますか？',
        choices: ['はい', 'いいえ'],
        result: ''
      }
    }
  },

  computed: {
    // ページ内のすべての入力が正しい場合はtrueを返す
    validateResults () {
      return (
        this.step21.result !== '' &&
        this.step22.result !== '' &&
        this.step23.result !== ''
      )
    },

    // storeへのアクセス
    ...mapGetters('Step2', [
      'storedResult21',
      'storedResult22',
      'storedResult23'
    ]),
    ...mapGetters('Step1', ['storedResult11', 'storedResult12']),

    // 前ページの入力が完了していればtrueを返す
    isProcedureCollect () {
      return (
        this.storedResult11 !== undefined && this.storedResult12 !== undefined
      )
    }
  },

  methods: {
    // storeへ入力値をコミットしたのち、次のステップページへ遷移する
    toNextStep () {
      this.$store.commit('Step2/setResults', {
        step21: this.step21,
        step22: this.step22,
        step23: this.step23
      })
      this.$router.push({ name: 'step3' })
    },

    // numの数だけブラウザ履歴を元にページ遷移する
    routerGo (num) {
      this.$router.go(num)
    }
  },

  created () {
    // storeに値が入っている場合はdataに反映する
    this.step21 = this.storedResult21 || this.step21
    this.step22 = this.storedResult22 || this.step22
    this.step23 = this.storedResult23 || this.step23
  }
}
</script>
