<template>
  <v-app>

    <!-- Tool bar bovenaan -->
    <v-app-bar
      class="text-white pl-3 py-3"
      color="#00aaa2"
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

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Uitloggen
        </v-tooltip>
      </v-btn>
    </v-app-bar>

    <!-- Vier hoofdfuncties -->
    <v-main>
      <router-view />
      <!-- <form-damages /> -->
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
  // import FormDamages from "@/components/FormDamages.vue";

  export default {
    name: "App",
    data() {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-grid', path: '/', name: 'dashboard' },
          { title: 'Recent', icon: 'mdi-history', name: 'recent' },
          { title: 'Zoeken', icon: 'mdi-magnify', name: 'zoeken' },
          { title: 'Informatie', icon: 'mdi-information', path: '/informatie', name: 'informatie' }
        ]
      };
    },
    // components: {
    //   FormDamages
    // },
    created() {
        this.$store.dispatch('fetchInspections');
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  }
</script>