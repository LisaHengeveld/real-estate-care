import { createStore } from 'vuex';
import { storage } from '@/firebase';
import InspectionsService from "../services/InspectionsService.js";

export default createStore({
  state: {
    // Data of all completed and assigned inspections
    inspections: []
  },

  mutations: {
    // Place retrieved data in state object
    SET_INSPECTIONS(state, payload) {
      state.inspections = payload;
    },
  },

  actions: {
    // Get data of inspections
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
    // Return data of the assigned inspections
    getAssignedInspections: (state) => {
      return state.inspections.filter(insp => insp.completed === false);
    },
    // Return data of the completed inspections
    getCompletedInspections: (state) => {
      return state.inspections.filter(insp => insp.completed === true);
    },
    // Only return data of the requested inspection
    getInspection: (state) => (id) => {
      return state.inspections.find(insp => insp.id === +id);
    }
  },

  modules: {
  }
})
