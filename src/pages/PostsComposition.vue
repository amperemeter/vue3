<script>
import axios from "axios";
import PostForm from "@/components/Posts/PostForm.vue";
import PostList from "@/components/Posts/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {usePosts} from "@/hooks/usePosts";
import {useSort} from "@/hooks/useSort";
import {useSortAndSearch} from "@/hooks/useSortAndSearch";

export default {
  components: {
    MyDialog, MySelect, MyButton, MyInput, PostForm, PostList,
  },

  data() {
    return {
      dialogVisible: false,
      isPostLoading: false,
      page: 1,
      totalPages: 0,
      limit: 10,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },

  methods: {
    // createPost(post) {
    //   this.posts.push(post);
    //   this.dialogVisible = false;
    // },
    // removePost(post) {
    //   this.posts = this.posts.filter(el => el.id !== post.id);
    // },
    showDialog() {
      this.dialogVisible = true;
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(e);
      }
    },

    observe() {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      const callback = (entries) => {
        if (entries[0].isIntersecting && this.page < this.totalPages) {
          this.loadMorePosts();
        }
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(this.$refs.observer);
    }
  },

  mounted() {
    this.observe();
  },

  setup() {
    const {posts, isPostLoading, totalPages} = usePosts(1, 10);
    const {selectedSort, sortedPosts} = useSort(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortAndSearch(sortedPosts);

    return {
      posts, isPostLoading, totalPages,
      selectedSort, sortedPosts,
      searchQuery, sortedAndSearchedPosts,
    }
  }
}
</script>

<template>
  <div>
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
<!--      <PostForm @create="createPost"/>-->
    </MyDialog>

    <div v-if="!isPostLoading">
      <PostList
          :posts="sortedAndSearchedPosts"
      />
<!--      @remove="removePost"-->

    </div>

    <div v-else>Идет загрузка...</div>
    <div ref="observer" class="observer"></div>
  </div>
</template>

<style scoped>
.app_btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>