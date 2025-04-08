<template>
  <div>
    <div>
      <h1>Страница с постами</h1>
      <my-input v-model="searchQuery" placeholder="Поиск" v-focus />
      <div class="app_buttons">
        <my-button>Создать пост</my-button>
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>

      <my-dialog v-model:show="dialogVisible"> <post-form /></my-dialog>
      <post-list :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
      <h3 v-else>Идёт загрузка...</h3>
      <div v-intersection="loadMorePost" class="observer"></div>
    </div>
  </div>
</template>

<script>
import useSortedPosts from "@/components/hooks/useSortedAndSearchedPosts";
import useSortedAndSearchedPosts from "@/components/hooks/useSortedAndSearchedPosts";
import { usePosts } from "@/components/hooks/usePosts";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";

import axios from "ProjectLearningVue/node_modules/axios";
import { ref } from "ProjectLearningVue/node_modules/vue/dist/vue";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },

  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
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
