<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput, PostForm, PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '0',
      searchQuery: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
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
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) => {
        return p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]);
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."/>

    <div class="app_btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <MyDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </MyDialog>

    <PostList
        v-if="!isPostLoading"
        :posts="sortedAndSearchedPosts"
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

.app_btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

</style>