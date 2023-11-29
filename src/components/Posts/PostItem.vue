<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="post_btns">
      <MyButton @click="$router.push(`/post/${post.id}`)">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid teal;
}
.post_btns {
  display: flex;
}
.post_btns button {
  margin-left: 8px;
}
</style>