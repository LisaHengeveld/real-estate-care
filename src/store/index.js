import { createStore } from 'vuex';
import InspectionsService from "../services/InspectionsService.js";

export default createStore({
  state: {
    // Data of completed inspections
    inspections: []
  },
  mutations: {
    // Place retrieved data in state object
    SET_INSPECTIONS(state, payload) {
      state.inspections = payload;
    },
  },
  actions: {
    // Get data
    async fetchInspections({ commit }) {
      try {
        const inspectionsData = await InspectionsService.fetchData();
        commit('SET_INSPECTIONS', inspectionsData);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  },
  getters: {
    // Only return data of the requested inspection
    getInspection: (state) => (id) => {
      return state.inspections.find(insp => insp.id === +id);
    }
  },
  modules: {
  }
})
