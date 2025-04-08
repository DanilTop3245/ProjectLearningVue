<template>
  <div>
    <!-- <div>
          <button @click="addLike">Like</button>
          <button @click="addDislike">Dislike</button></div>
      <div>
        Количество лайков = <strong>{{ likes }}</strong>
      </div>
      <div>
        Количество дизлайков = <strong>{{ dislikes }}</strong>
      </div> -->
    <div>
      <h1>Страница с постами</h1>
      <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск"
        v-focus
      />
      <div class="app_buttons">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
        />
      </div>

      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost"
      /></my-dialog>
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading"
      />
      <h3 v-else>Идёт загрузка...</h3>
      <div v-intersection="loadMorePost" class="observer"></div>
      <!-- <div class="page_wrapper">
          <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page"
            :class="{ current_page: page === pageNumber }"
            @click="changePage(pageNumber)"
          >
            {{ pageNumber }}
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import axios from "ProjectLearningVue/node_modules/axios";
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations,
} from "ProjectLearningVue/node_modules/vuex/types";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      setPage: "post/setPage",
    };
  },

  methods: {
    ...mapMutations({
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
      setPage: "post/setPage",
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      loadMorePost: "post/loadMorePost",
    }),
    ...mapGetters({
      posts: "getPosts",
      isPostLoading: "isPostLoading",
      dialogVisible: "dialogVisible",
      selectedSort: "selectedSort",
      searchQuery: "searchQuery",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    // async fetchPosts() {
    //   try {
    //     this.isPostLoading = true;
    //     const response = await axios.get(
    //       "https://jsonplaceholder.typicode.com/posts",
    //       {
    //         params: {
    //           _page: this.page,
    //           _limit: this.limit,
    //         },
    //       }
    //     );
    //     this.totalPages = Math.ceil(
    //       response.headers["x-total-count"] / this.limit
    //     );
    //     this.posts = response.data;
    //   } catch (err) {
    //     alert("Ошибка при загрузке данных: " + err);
    //   } finally {
    //     this.isPostLoading = false;
    //   }
    // },
    // async loadMorePost() {
    //   try {
    //     this.page++;
    //     const response = await axios.get(
    //       "https://jsonplaceholder.typicode.com/posts",
    //       {
    //         params: {
    //           _page: this.page,
    //           _limit: this.limit,
    //         },
    //       }
    //     );
    //     this.totalPages = Math.ceil(
    //       response.headers["x-total-count"] / this.limit
    //     );
    //     this.posts = [...this.posts, ...response.data];
    //   } catch (err) {
    //     alert("Ошибка при загрузке данных: " + err);
    //   } finally {
    //   }
    // },
    // inputTitle(event) {
    //     this.title = event.target.value;
    // },
    // inputDescripton(event) {
    //     this.body = event.target.value;
    // }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  // watch: {
  //   selectedSort(newValue) {
  //       this.posts.sort((post1, post2) => {
  //         return post1[newValue]?.localeCompare(post2[newValue]);
  //       });
  //   },
  // },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  },
};
</script>

<style scoped>
.app_buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.page_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  flex-wrap: wrap;
}
.page {
  border: 1px solid teal;
  padding: 10px 15px;
  margin: 5px 5px;
  cursor: pointer;
}
.current_page {
  background: teal;
  color: white;
}
.observer {
  height: 30px;
  background: teal;
  margin-top: 15px;
  border-radius: 5px;
}
</style>
