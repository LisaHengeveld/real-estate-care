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

    // Werkt nog niet
    async updateInspection(context, value) {
      try {
        await InspectionsService.updateData(value);
        // Optionally, you can commit mutations to update the local state here if needed.
      } catch (error) {
        console.error("Error: ", error);
      }
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
