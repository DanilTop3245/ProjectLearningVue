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
      <my-input v-model="searchQuery" placeholder="Поиск" v-focus />
      <div class="app_buttons">
        <my-button @click="showDialog">Создать пост</my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
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

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },

  methods: {
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (err) {
        alert("Ошибка при загрузке данных: " + err);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePost() {
      try {
        this.page++;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (err) {
        alert("Ошибка при загрузке данных: " + err);
      } finally {
      }
    },
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
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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
