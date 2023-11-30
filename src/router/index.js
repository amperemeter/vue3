import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import Posts from "@/pages/Posts.vue";
import Post from "@/pages/Post.vue";
import PostsWithStore from "@/pages/PostsWithStore.vue";

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/post/:id',
    component: Post,
  },
  {
    path: '/store',
    component: PostsWithStore,
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;