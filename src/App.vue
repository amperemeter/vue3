<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {Navbar}
}
</script>

<template>
  <Navbar></Navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  margin: 20px;
}
</style>