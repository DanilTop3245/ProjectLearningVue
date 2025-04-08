import About from "@/pages/About.vue";
import Main from "@/pages/Main.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageWithCompositionApi from "@/pages/PostPageWithCompositionApi.vue";
import PostPageWithStore from "@/pages/PostPageWithStore.vue";
import {
  createRouter,
  createWebHistory,
} from "ProjectLearningVue/node_modules/vue-router/dist/vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostPageWithStore,
  },
  // {
  //     path: '/composition',
  //     component: PostPageWithCompositionApi
  // },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
