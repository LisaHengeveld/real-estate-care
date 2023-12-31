import { createStore } from 'vuex';
import InspectionsService from "../services/InspectionsService.js";

export default createStore({
  state: {
    isLoggedIn: true,             // Logged in status
    inspections: [],               // Data of all completed and assigned inspections
    unsubscribeInspections: null,
    isLoading: false,              // Loading spinner
    errorMessage: {                // Show/hide snackbar with error message
      show: false,
      text: ""
    },
    snackbar: {                    // Show/hide snackbar with message
      show: false,
      text: ""
    }
  },

  mutations: {
    SET_IS_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },
    SET_INSPECTIONS(state, inspections) {
      state.inspections = inspections;
    },
    SET_UNSUBSCRIBE_INSPECTIONS(state, unsubscribe) {
      state.unsubscribeInspections = unsubscribe;
    },
    CLEAR_UNSUBSCRIBE_INSPECTIONS(state) {
      state.unsubscribeInspections = null;
    },
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
    SET_ERROR(state, errorMessage) {
      state.errorMessage.text = errorMessage;
      state.errorMessage.show = true;
    },
    HIDE_ERROR(state) {
      state.errorMessage.show = false;
    },
    SHOW_SNACKBAR(state, text) {
      let timeout = 0;
      // When currently a snackbar is shown, hide it and set a timeout before new one is shown
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    HIDE_SNACKBAR(state) {
      state.snackbar.show = false;
    }
  },

  actions: {
    setIsLoggedIn({ commit }, value) {
      commit('SET_IS_LOGGED_IN', value);
    },
    // Get data of inspections
    fetchInspections({ commit }) {
      commit('SET_LOADING', true); // Start loading
      commit('HIDE_ERROR'); // Reset errors

      const unsubscribe = InspectionsService.fetchData(
        (inspectionsData) => {
            commit('SET_INSPECTIONS', inspectionsData); // Update state with fetched inspections
            commit('SET_LOADING', false); // Loading done
        },
        (error) => {
            commit('SET_ERROR', "Er ging iets mis bij het ophalen van de data. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
            commit('SET_LOADING', false);
        }
      );

      commit('SET_UNSUBSCRIBE_INSPECTIONS', unsubscribe);
    },
    unsubscribeInspections({ state, commit }) {
      if (state.unsubscribeInspections) {
        state.unsubscribeInspections();
        commit('CLEAR_UNSUBSCRIBE_INSPECTIONS');
      }
    },
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
    showSnackbar({ commit }, text) {
      commit('SHOW_SNACKBAR', text);
    },
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
})
