<script>
import PostItem from "@/components/Posts/PostItem.vue";

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
    <transition-group name="user-list">
      <PostItem
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>

  <h4 v-else>Список постов пуст</h4>
</template>

<style scoped>
h4 {
  color: firebrick;
}

.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.user-list-move {
  transition: transform 0.4s ease;
}
</style>