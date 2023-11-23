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
  <div>
    <h3>Список постов</h3>
    <PostItem
        v-for="post in posts"
        :post="post"
    />
  </div>
</template>

<style scoped>
</style>