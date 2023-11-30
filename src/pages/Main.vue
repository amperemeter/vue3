<script>
export default {
  name: 'Main',
}
</script>

<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <div class="menu_links">
      <router-link to="/posts">Посты</router-link>
      <router-link to="/store">Посты со store</router-link>
    </div>
  </div>
</template>

<style scoped>
.menu_links a {
  margin-right: 12px;
}
</style>