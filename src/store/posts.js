import axios from "axios";

export const postsModule = {
  state: () => ({
    posts: [],
    isPostLoading: false,
    selectedSort: '0',
    searchQuery: '',
    page: 1,
    totalPages: 0,
    limit: 10,
    sortOptions: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По содержимому'},
    ],
  }),


  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((p1, p2) => {
        return p1[state.selectedSort]?.localeCompare(p2[state.selectedSort]);
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post => {
        return post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      });
    },
  },


  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPostLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },


  actions: {
    async fetchPosts({state, commit}) {
      commit('setPostLoading', true);

      try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url, {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });

        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', response.data);
      } catch (e) {
        alert(e);
      } finally {
        commit('setPostLoading', false);
      }
    },

    async loadMorePosts({state, commit}) {
      commit('setPage', state.page + 1);

      try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await axios.get(url, {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });

        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (e) {
        alert(e);
      }
    },
  },
  namespaced: true,
};