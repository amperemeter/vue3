<script>
import axios from "axios";
import PostForm from "@/components/Posts/PostForm.vue";
import PostList from "@/components/Posts/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyDialog from "@/components/UI/MyDialog.vue";

export default {
  components: {
    MyDialog, MySelect, MyButton, MyInput, PostForm, PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '0',
      searchQuery: '',
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
        const url = 'https://jsonplaceholder.typicode.com/posts?0';
        const response = await axios.get(url, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;
      try {
        const url = 'https://jsonplaceholder.typicode.com/posts?0';
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
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },

    // observe() {
    //   const options = {
    //     rootMargin: "0px",
    //     threshold: 1.0,
    //   };
    //
    //   const callback = (entries) => {
    //     if (entries[0].isIntersecting && this.page < this.totalPages) {
    //       this.loadMorePosts();
    //     }
    //   };
    //
    //   const observer = new IntersectionObserver(callback, options);
    //   observer.observe(this.$refs.observer);
    // }
  },
  mounted() {
    this.fetchPosts();
    // this.observe();
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
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
    // posts() {
    //   if (!this.posts.length) {
    //     this.fetchPosts();
    //   }
    // }
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
      <PostForm @create="createPost"/>
    </MyDialog>

    <div v-if="!isPostLoading">
      <PostList
          :posts="sortedAndSearchedPosts"
          @remove="removePost"
      />
      <!--      <div class="page-wrapper">-->
      <!--        <span-->
      <!--            v-for="pageNumber in totalPages"-->
      <!--            :key="pageNumber"-->
      <!--            :class="{'current_page': pageNumber === page}"-->
      <!--            @click="changePage(pageNumber)"-->
      <!--        >{{ pageNumber }}</span>-->
      <!--      </div>-->
    </div>

    <div v-else>Идет загрузка...</div>
<!--    <div ref="observer" class="observer"></div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<style scoped>
.app_btns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 10px;
}

/*.page-wrapper {
  display: flex;
}

.page-wrapper span {
  padding: 0 10px;
  cursor: pointer;
}

.current_page {
  outline: 1px solid firebrick;
}*/
</style>