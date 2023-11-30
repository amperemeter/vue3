<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  name: "Navbar",
  components: {MyButton}
}
</script>

<template>
<div class="navbar">
  <div class="logo" @click="$router.push('/')">Vue3</div>
  <div class="nav_btns">
    <MyButton @click="$router.push('/posts')">Посты</MyButton>
    <MyButton @click="$router.push('/store')">Store</MyButton>
  </div>
</div>
</template>

<style scoped>
.navbar {
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
}

.navbar * {
  cursor: pointer;
}

.nav_btns button {
  margin-left: 8px;
}

</style>