<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(event) {
      console.log(event)
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>

<template>
  <select
      :value="modelValue"
      @change="changeOption"
  >
    <option disabled value="0">Выберите из списка</option>
    <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>
</style>