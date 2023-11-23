<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <PostItem
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
  </div>

  <h4 v-else>Список постов пуст</h4>
</template>

<style scoped>
h4 {
  color: firebrick;
}
</style>