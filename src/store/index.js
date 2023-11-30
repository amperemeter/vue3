import {createStore} from "vuex";
import {postsModule} from "@/store/posts";

export default createStore({
  modules: {
    post: postsModule,
  },
});