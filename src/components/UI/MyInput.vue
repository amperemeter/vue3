<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<template>
  <input type="text" :value="modelValue" @input="updateInput"/>
</template>

<style scoped>
input {
  width: 100%;
  padding: 5px;
  margin: 5px 0;
}
</style>