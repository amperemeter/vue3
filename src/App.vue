<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  components: {
    MyButton,
    PostForm, PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      this.isPostLoading = true;
      try {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
        const response = await axios.get(url);
        this.posts = response.data;
      } catch (e) {
        alert(e);
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>

<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyButton class="btn_create" @click="showDialog">Создать пост</MyButton>
    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </MyDialog>
    <PostList
        v-if="!isPostLoading"
        :posts="posts"
        @remove="removePost"
    />
    <div v-else>Идет загрузка...</div>
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

.btn_create {
  margin-bottom: 30px;
}
</style>