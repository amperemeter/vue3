import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import Posts from "@/pages/Posts.vue";
import Post from "@/pages/Post.vue";

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
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;