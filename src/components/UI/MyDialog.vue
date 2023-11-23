<script>
export default {
  name: 'MyDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog_content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
}

.dialog_content {
  min-width: 300px;
  min-height: 100px;
  margin: auto;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
}
</style>