import { createStore } from 'vuex';
import InspectionsService from "../services/InspectionsService.js";
// import axios from 'axios';

export default createStore({
  state: {
    inspections: []
  },
  mutations: {
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
    },
    sendInspection(context) {
      // Komt nog
    }
  },
  getters: {
    // Only return the requested inspection
    getInspection: (state) => (id) => {
      return state.inspections.find(insp => insp.id === +id);
    },
    getDamage(state, id, index) {
      return getters.getInspection(id).damage[index];
    }
  },
  modules: {
  }
})
