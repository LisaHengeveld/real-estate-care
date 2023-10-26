import { createStore } from 'vuex'
import apiClient from "../services/InspectionsService.js"

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
    fetchInspections(context) {
      apiClient.fetchData()
        .then(inspectionsData => {
            // Sort by date
            inspectionsData.sort((a, b) => {
                return new Date(b.dateOfInspection) - new Date(a.dateOfInspection);
            });

            context.commit('SET_INSPECTIONS', inspectionsData);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    },
  },
  getters: {
    // Only return the requested inspection
    getInspection: (state) => (id) => {
      return state.inspections.find(insp => insp.id === +id);
    }
  },
  modules: {
  }
})
