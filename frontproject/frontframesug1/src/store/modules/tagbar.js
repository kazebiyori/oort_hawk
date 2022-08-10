const state = {
  cacheTags: ["/datadisplay", "/datastatistics"],
  activeTag: "/datadisplay",
};

const getters = {
  cacheTagsName: (state) => {
    let tagsName = [];
    state.cacheTags.filter((item) => {
      let tmp = item.match(/[a-zA-Z0-9]+/)[0];
      tagsName.push(tmp[0].toUpperCase() + tmp.slice(1, tmp.length));
    });
    return tagsName;
  },
};

const mutations = {
  SET_TAG(state, payload) {
    if (payload) {
      state.activeTag = payload.tag;
    } else {
      state.activeTag =
        state.cacheTags[state.cacheTags.length - 1] || "homepage";
    }
  },

  PUSH_TAG(state, payload) {
    state.cacheTags.push(payload.tag);
    state.activeTag = payload.tag;
  },

  DELETE_TAG(state, payload) {
    state.cacheTags = state.cacheTags.filter((item) => item != payload);
    state.activeTag = state.cacheTags[0] || "homepage";
  },
};

const actions = {
  // toggleSideBar({ commit }) {
  //   commit("TOGGLE_SIDEBAR");
  // },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
