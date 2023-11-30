import {computed, ref} from "vue";

export function useSort(posts) {
  const selectedSort = ref('0');

  const sortedPosts = computed(() => {
    return [...posts.value].sort((p1, p2) => {
      return p1[selectedSort.value]?.localeCompare(p2[this.selectedSort.value]);
    });
  });

  return {
    selectedSort, sortedPosts,
  }
}