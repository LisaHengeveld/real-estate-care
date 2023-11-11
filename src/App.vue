<template>
  <v-app>
    <!-- Loading spinner for when fetching data -->
    <v-overlay
      :model-value="loadingSpinner"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <!-- Tool bar top -->
    <v-app-bar
      v-if="isLoggedIn"
      class="text-white pl-3 py-3"
      color="primary"
      image="banner.png"
      height="60"
    >

      <v-img
        src="logo.png"
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

    <!-- Router view -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Tab bar bottom -->
    <v-bottom-navigation
      v-if="isLoggedIn"
      :value="currentRouteName"
      :shift="true"
      color="primary"
      grow
    >
      <v-btn 
        :value="item.name"
        v-for="item in items"
        :key="item.name"
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
        isLoggedIn.value = false;
      }
    });
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/inloggen");
    });
  };
</script>

<script>
  export default {
    name: "App",

    data() {
      return {
        // Buttons in the bottom navigation
        items: [
          { title: 'Dashboard', icon: 'mdi-view-grid', path: '/', name: 'dashboard' },
          { title: 'Recent', icon: 'mdi-history', name: 'recent' },
          { title: 'Zoeken', icon: 'mdi-magnify', name: 'zoeken' },
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
      }
    }
  }
</script>