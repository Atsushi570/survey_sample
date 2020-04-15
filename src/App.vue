<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router/index'
import store from './store/index'

export default {
  router,
  store
}
</script>
