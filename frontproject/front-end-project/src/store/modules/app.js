const state = {
  sidebar: {
    showDataList: false,
    showFilter: false,
  },
  datadisplayselector:{
    showSelector:true,
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
  OPEN_DATADISPLAYSELECTOR(state, payload) {
    state.datadisplayselector.showSelector = true;
  },
  CLOSE_DATADISPLAYSELECTOR(state, payload) {
    state.datadisplayselector.showSelector = false;
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  openDatadisplayselector({ commit }) {
    commit("OPEN_DATADISPLAYSELECTOR");
  },
  closeDatadisplayselector({ commit }) {
    commit("CLOSE_DATADISPLAYSELECTOR");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
