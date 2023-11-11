import { createStore } from 'vuex';
import InspectionsService from "../services/InspectionsService.js";

export default createStore({
  state: {
    inspections: [], // Data of all completed and assigned inspections
    isLoading: false,
    error: null,
  },

  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_INSPECTIONS(state, payload) {
      state.inspections = payload;
    },
    UPDATE_INSPECTION(state, { id, updatedInspectionData }) {
      const index = state.inspections.findIndex(insp => insp.id === id);
      if (index !== -1) {
          state.inspections[index] = updatedInspectionData;
      } 
    },
  },

  actions: {
    // Get data of inspections
    async fetchInspections({ commit }) {
      commit('SET_LOADING', true); // Start loading
      commit('SET_ERROR', null); // Reset errors
      try {
        const inspectionsData = await InspectionsService.fetchData();
        commit('SET_INSPECTIONS', inspectionsData); // Update state with fetched inspections
        commit('SET_LOADING', false); // Loading done
        console.log(inspectionsData);
        console.log("Data fetched");
      } catch (error) {
        commit('SET_ERROR', error); // Handle errors
        commit('SET_LOADING', false); // Loading done
        console.error("Error fetching inspections: ", error);
      }
    },
    // Delete data
    deleteFormData() {

    },
    // Save new data
    // async updateInspectionData({ commit }, { id, updatedData }) {
    //   try {
    //     const updatedInspectionData = await InspectionsService.updateData(id, updatedData);
    //     // commit('UPDATE_INSPECTION', { id, updatedInspectionData });
    //   } catch (error) {
    //     console.error("Error updating data: ", error);
    //   }
    // },
    // Save assigned inspection as completed inspection
    completeInspection() {

    }
  },

  getters: {
    // Get data of the assigned inspections
    getAssignedInspections: (state) => {
      return state.inspections.filter(insp => insp.completed === false);
    },
    // Get data of the completed inspections
    getCompletedInspections: (state) => {
      return state.inspections.filter(insp => insp.completed === true);
    },
    // Get data of the requested inspection
    getInspection: (state) => (id) => {
      return state.inspections.find(insp => insp.id === id);
    },
    // Get damage at the requested index of the requested inspection
    getDamage: (state) => (id, index) => {
      return state.inspections.find(insp => insp.id === id).damages[+index];
    },
    // Get deferred maintenance at the requested index of the requested inspection
    getDeferredMaintenance: (state) => (id, index) => {
      return state.inspections.find(insp => insp.id === id).deferredMaintenance[+index];
    },
    // Get technical installation at the requested index of the requested inspection
    getTechnicalInstallation: (state) => (id, index) => {
      return state.inspections.find(insp => insp.id === id).technicalInstallations[+index];
    },
    // Get modification at the requested index of the requested inspection
    getModification: (state) => (id, index) => {
      return state.inspections.find(insp => insp.id === id).modifications[+index];
    },
  },

  modules: {
  }
})
