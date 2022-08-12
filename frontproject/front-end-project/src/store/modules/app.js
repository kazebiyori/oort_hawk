const state = {
  sidebar: {
    showDataList: true,
    showFilter: false,
  },
};

const getters = {
  sidebaIsOpened(state, getters, rootState) {
    return state.sidebar.isOpened;
  },
};

const mutations = {
  TOGGLE_SIDEBAR(state, payload) {
    state.sidebar.showDataList = !state.sidebar.showDataList;
  },
  TOGGLE_FILTER(state, payload) {
    state.sidebar.showFilter = !state.sidebar.showFilter;
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
