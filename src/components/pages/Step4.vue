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
              <p class="has-text-info">{{storedResult11.title}}</p>
              <p class="result">{{storedResult11.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">{{storedResult12.title}}</p>
              <p class="result">{{storedResult12.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedResult21.title}}-</p>
              <p class="result">{{storedResult21.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedResult22.title}}-</p>
              <p class="result">{{storedResult22.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">-{{storedResult23.title}}-</p>
              <p class="result">{{storedResult23.result}}</p>
            </div>
          </div>
          <div class="content">
            <div class="survey-content">
              <p class="has-text-info">{{storedResult31.title}}</p>
              <p class="result">{{storedResult31.result}}</p>
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

export default {
  components: {
    Header,
    Footer
  },

  computed: {
    // storeへのアクセス
    ...mapGetters('Step1', ['storedResult11', 'storedResult12']),
    ...mapGetters('Step2', [
      'storedResult21',
      'storedResult22',
      'storedResult23'
    ]),
    ...mapGetters('Step3', ['storedResult31']),

    // 前ページの入力が完了していればtrueを返す
    isProcedureCollect () {
      return this.storedResult31 !== undefined
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
