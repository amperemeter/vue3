<script>
import PostForm from "@/components/Posts/PostForm.vue";
import PostList from "@/components/Posts/PostList.vue";
import MyInput from "@/components/UI/MyInput.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {
    MyDialog, MySelect, MyButton, MyInput, PostForm, PostList,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      totalPages: state => state.post.totalPages,
      limit: state => state.post.limit,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  methods: {
    ...mapMutations({
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
}
</script>

<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
    />

    <div class="app_btns">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
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
    </div>

    <div v-else>Идет загрузка...</div>
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
</style>