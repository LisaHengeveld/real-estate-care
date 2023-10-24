<template>
  <v-app id="inspire">

    <!-- Tool bar bovenaan -->
    <v-toolbar
      class="text-white pl-3 py-3"
      dark
      prominent
      color="#00aaa2"
      image="banner.png"
      height="70"
      elevation="3"
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

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Uitloggen
        </v-tooltip>
      </v-btn>
    </v-toolbar>

    <!-- Vier hoofdfuncties -->
    <v-main>
      <router-view />
      <!-- <inspections /> -->
    </v-main>

    <!-- Tab bar onderaan -->
    <v-bottom-navigation 
      :value="currentRouteName"
      :shift="true"
      color="#00aaa2"
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


<script>
  import Inspections from "@/components/Inspections.vue";

  export default {
    name: "App",
    data() {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-grid', path: '/', name: 'dashboard' },
          { title: 'Recent', icon: 'mdi-history', path: '/recent', name: 'recent' },
          { title: 'Zoeken', icon: 'mdi-magnify', path: '/zoeken', name: 'zoeken' },
          { title: 'Informatie', icon: 'mdi-information', path: '/informatie', name: 'informatie' }
        ]
      };
    },
    components: {
      Inspections
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  }
</script>