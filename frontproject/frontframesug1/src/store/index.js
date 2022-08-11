import { createStore } from "vuex";

import app from "./modules/app.js";
import tagbar from "./modules/tagbar.js";

export const store = createStore({
  modules: {
    app,
    tagbar,
  
  },
});
