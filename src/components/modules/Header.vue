<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1>
        <a class="navbar-item" href="#">Sample App</a>
      </h1>
    </div>

    <div class="buttons">
      <a class="button is-dark">ログイン</a>
      <a class="button is-primary">
        <strong>新規登録</strong>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
}
h1 {
  font-size: 22px;
}
.buttons {
  margin-left: auto;
}
.button {
  font-size: 10px;
  font-weight: bold;
}
</style>
