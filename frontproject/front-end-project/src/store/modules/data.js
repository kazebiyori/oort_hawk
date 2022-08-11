import { fetchData } from "@/api/index.js";

const state = {
  dataList: [],
};

const getters = {
  // sidebaIsOpened(state, getters, rootState) {
  //   return state.sidebar.isOpened;
  // },
};

const mutations = {
  // TOGGLE_SIDEBAR(state, payload) {
  //   state.sidebar.isOpened = !state.sidebar.isOpened;
  // },
};

const actions = {
  async initDataList({ commit, state }) {
    let data = await fetchData();
    state.dataList = data.data.data;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
