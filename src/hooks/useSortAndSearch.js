import {computed, ref} from "vue";

export function useSortAndSearch(sortedPosts) {
  const searchQuery = ref('');

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(post => {
      return post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    });
  });

  return {
    searchQuery, sortedAndSearchedPosts,
  }
}