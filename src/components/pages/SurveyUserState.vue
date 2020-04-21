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
              :content="{...this.joinedInsurance, storedResult: this.storedJoinedInsurance}"
              v-model="joinedInsurance.result"
            ></SurveyRadio>
            <SurveyRadio
              :content="{...this.currentHealth, storedResult:this.storedCurrentHealth}"
              v-model="currentHealth.result"
              v-if="joinedInsurance.result"
            ></SurveyRadio>
            <SurveyRadio
              :content="{...this.pastHealth, storedResult:this.storedPastHealth}"
              v-model="pastHealth.result"
              v-if="currentHealth.result"
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
        <button class="button is-primary" @click="$router.push({ name: 'surveyUserProfile' })">
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
      joinedInsurance: {
        title: '現在、生命保険に加入されていますか？',
        choices: ['はい', 'いいえ'],
        result: ''
      },
      currentHealth: {
        title:
          '現在入院中ですか？または、最近3か月以内に医師の診療・検査の結果、入院・手術を勧められたことはありますか？',
        choices: ['はい', 'いいえ'],
        result: ''
      },
      pastHealth: {
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
        this.joinedInsurance.result &&
        this.currentHealth.result &&
        this.pastHealth.result
      )
    },

    // storeへのアクセス
    ...mapGetters('SurveyResults', ['storedGender', 'storedDateOfBirth', 'storedJoinedInsurance', 'storedCurrentHealth', 'storedPastHealth']),

    // 前ページの入力が完了していればtrueを返す
    isProcedureCollect () {
      return (
        this.storedGender.isCommitted && this.storedDateOfBirth.isCommitted
      )
    }
  },

  methods: {
    // storeへ入力値をコミットしたのち、次のステップページへ遷移する
    toNextStep () {
      this.$store.commit('SurveyResults/setJoinedInsurance', this.joinedInsurance)
      this.$store.commit('SurveyResults/setCurrentHealth', this.currentHealth)
      this.$store.commit('SurveyResults/setPastHealth', this.pastHealth)
      this.$router.push({ name: 'surveyRequest' })
    },

    // numの数だけブラウザ履歴を元にページ遷移する
    routerGo (num) {
      this.$router.go(num)
    }
  },

  created () {
    // storeに値が入っている場合はdataに反映する
    this.joinedInsurance = this.storedJoinedInsurance.isCommitted ? this.storedJoinedInsurance : this.joinedInsurance
    this.currentHealth = this.storedCurrentHealth.isCommitted ? this.storedCurrentHealth : this.currentHealth
    this.pastHealth = this.storedPastHealth.isCommitted ? this.storedPastHealth : this.pastHealth
  }
}
</script>
