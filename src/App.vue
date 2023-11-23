<template>
  <v-app>
    <!-- Loading spinner for when fetching data -->
    <v-overlay
      :model-value="loadingSpinner"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <!-- Tool bar top -->
    <v-app-bar
      v-if="isLoggedIn"
      :image="bannerImage"
      class="text-white pl-3 py-3"
      color="primary"
      height="60"
    >

      <v-img
        :src="bannerLogo"
        alt="Real Estate Care"
        width="100"
      ></v-img>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Meldingen
        </v-tooltip>
      </v-btn>

      <v-btn
        icon
        @click="handleSignOut"
      >
        <v-icon>mdi-export</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Uitloggen
        </v-tooltip>
      </v-btn>
    </v-app-bar>

    <!-- Error message -->
    <error-message />

    <!-- Router view -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Snackbar -->
    <snackbar-message />

    <!-- Tab bar bottom -->
    <v-bottom-navigation
      v-if="isLoggedIn"
      :value="currentRouteName"
      :shift="true"
      color="primary"
      grow
    >
      <v-btn 
        v-for="item in items"
        :key="item.name"
        :value="item.name"
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useStore } from "vuex";
  import router from "./router";

  const isLoggedIn = ref(false);
  const store = useStore();
  let auth;

  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
        // Fill the store with the data
        store.dispatch('fetchInspections');
      } else {
        store.dispatch('unsubscribeInspections');  // Dispatch the action to unsubscribe
        isLoggedIn.value = false;
      }
    });
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
        store.dispatch('unsubscribeInspections'); // Dispatch the action to unsubscribe
        router.push("/inloggen");
    }).catch((error) => {
        store.commit('SET_ERROR', "Er ging iets mis bij het uitloggen. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
    });
  };
</script>

<script>
import SnackbarMessage from "@/components/SnackbarMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

  export default {
    name: "App",
    components: {
      SnackbarMessage,
      ErrorMessage
    },
    data() {
      return {
        // Buttons in the bottom navigation
        items: [
          { title: 'Dashboard', icon: 'mdi-view-grid', path: '/', name: 'dashboard' },
          { title: 'Recent', icon: 'mdi-history', path: '/recent', name: 'recent' },
          { title: 'Zoeken', icon: 'mdi-magnify', path: '/zoeken', name: 'zoeken' },
          { title: 'Informatie', icon: 'mdi-information', path: '/informatie', name: 'informatie' }
        ]
      };
    },
    computed: {
      loadingSpinner() {
        return this.$store.state.isLoading;
      },
      currentRouteName() {
        return this.$route.name;
      },
      bannerImage() {
        return this.$vuetify.theme.global.current.dark
          ? require('@/assets/banner-dark.png')
          : require('@/assets/banner-light.png');
      },
      bannerLogo() {
        return this.$vuetify.theme.global.current.dark
          ? require('@/assets/logo-white.png')
          : require('@/assets/logo-dark.png');
      },
    },
    watch: {
      $route(to) {
        // Set the page title based on the route metadata or route name
        document.title = to.meta.title || 'Real Estate Care';
      }
    },
  }
</script>

<style>
  .v-list.no-surface-color {
    background-color: rgb(var(--v-theme-background));
  }
</style>