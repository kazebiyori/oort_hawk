const state = {
  sidebar: {
    isOpened: true,
  },
};

const getters = {
  sidebaIsOpened(state, getters, rootState) {
    return state.sidebar.isOpened;
  },
};

const mutations = {
  TOGGLE_SIDEBAR(state, payload) {
    state.sidebar.isOpened = !state.sidebar.isOpened;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
