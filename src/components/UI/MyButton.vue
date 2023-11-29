<script>
export default {
  name: 'MyButton',
}
</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  cursor: pointer;
}
</style>