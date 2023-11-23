<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

export default {
  components: {
    PostForm, PostList,
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'Название 1', body: 'Описание 1'},
        {id: 2, title: 'Название 2', body: 'Описание 2'},
        {id: 3, title: 'Название 3', body: 'Описание 3'},
      ],
    }
  },
  methods: {
    createPost(post) {
      console.log(post)
      this.posts.push(post);
    }
  }
}
</script>

<template>
  <div class="app">
    <PostForm @create="createPost"/>
    <PostList :posts="posts"/>
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