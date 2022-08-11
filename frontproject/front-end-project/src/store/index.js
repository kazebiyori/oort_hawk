import { createStore } from "vuex";

import app from "./modules/app.js";
import tagbar from "./modules/tagbar.js";
import data from "./modules/data.js";

export const store = createStore({
  modules: {
    app,
    tagbar,
    data,
  },
});
