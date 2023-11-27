<script>

export default {
  data() {
    return {
      post: {
        id: '',
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      if (this.post.title && this.post.body) {
        this.$emit('create', this.post);
        this.post = {
          title: '',
          body: '',
        };
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput
        v-model="post.title"
        placeholder="Название"
    />
    <MyInput
        v-model="post.body"
        type="text"
        placeholder="Описание"
    />
    <MyButton
        class="btn"
        @click="createPost"
    >Создать
    </MyButton>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: flex-end;
  margin: 10px 0;
}
</style>