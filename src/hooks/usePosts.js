import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(page, limit) {
  const posts = ref([]);
  const totalPages = ref();
  const isPostLoading = ref(true);

  const fetching = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts';
      const response = await axios.get(url, {
        params: {
          _page: page,
          _limit: limit,
        }
      });

      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (e) {
      alert(e);
    } finally {
      isPostLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts, page, totalPages, isPostLoading
  }
}