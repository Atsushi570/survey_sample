<template>
  <div>
    <Header></Header>

    <div class="container" v-if="isProcedureCollect">
      <div class="card">
        <header class="card-header is-shadowless">
          <small class="box has-background-info has-text-white has-text-centered">STEP4</small>
          <div class="card-header-title has-text-weight-normal">
            <p>
              <font-awesome-icon icon="chalkboard-teacher" />以下の内容をご確認ください。
            </p>
          </div>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">{{storedGender.title}}</p>
              <p class="result">{{storedGender.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">{{storedDateOfBirth.title}}</p>
              <p class="result">{{storedDateOfBirth.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedJoinedInsurance.title}}-</p>
              <p class="result">{{storedJoinedInsurance.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedCurrentHealth.title}}-</p>
              <p class="result">{{storedCurrentHealth.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedPastHealth.title}}-</p>
              <p class="result">{{storedPastHealth.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">{{storedRequest.title}}</p>
              <p class="result">{{storedRequest.result}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="button is-primary" @click="routerGo(-1)">
          前へ戻る
          <font-awesome-icon icon="angle-right" />
        </button>
        <button class="button is-primary">
          送信
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

export default {
  components: {
    Header,
    Footer
  },

  computed: {
    // storeへのアクセス
    ...mapGetters('SurveyResults', ['storedGender', 'storedDateOfBirth', 'storedJoinedInsurance', 'storedCurrentHealth', 'storedPastHealth', 'storedRequest']),

    // 前ページの入力が完了していればtrueを返す
    isProcedureCollect () {
      return this.storedRequest.isCommitted
    }
  },
  methods: {
    // numの数だけブラウザ履歴を元にページ遷移する
    routerGo (num) {
      this.$router.go(num)
    }
  }
}
</script>

<style scoped>
p.result{
	margin-left : 2vw;
}

</style>
