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
      <!-- <dashboard-buttons/> -->
      <inspections />
    </v-main>

    <!-- Tab bar onderaan -->
    <v-bottom-navigation
      v-model="value"
      color="#00aaa2"
      grow
    >
      <v-btn>
        <v-icon>mdi-view-grid</v-icon>
        Dashboard
      </v-btn>

      <v-btn>
        <v-icon>mdi-history</v-icon>
        Recent
      </v-btn>

      <v-btn>
        <v-icon>mdi-magnify</v-icon>
        Zoeken
      </v-btn>

      <v-btn>
        <v-icon>mdi-information</v-icon>
        Informatie
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>


<script>
  import DashboardButtons from "@/components/DashboardButtons.vue";
  import Inspections from "@/components/Inspections.vue";

  export default {
    name: "App",
    data() {
      return {
        value: 0, // Open app met dashboard
      }
    },
    components: {
      DashboardButtons,
      Inspections
    }
  }
</script>