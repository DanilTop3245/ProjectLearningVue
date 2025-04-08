import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

export default createStore({
  modules: {
    // Add your modules here
    post: postModule
  },
});
