<template>
  <v-list
        class="mt-10 no-surface-color"
        lines="two"
    >
        <v-list-subheader class="mb-5 text-h5 text-primary">
            {{ subject }}
        </v-list-subheader>
        <v-divider></v-divider>

        <!-- List the pdf files -->
        <div
          v-for="(pdf, index) in pdfList"
          :key="index"
        >
          <v-list-item
            class="pl-5"
            :value="pdf.name"
            :title="pdf.name"
            append-icon="mdi-open-in-new"
            @click="openNewTab(pdf.url)"
        >
        </v-list-item>
        <v-divider></v-divider>
        </div>
    </v-list>  
</template>

<script>
import FilesService from "@/services/FilesService.js";

export default {
  data() {
    return {
      pdfList: []
    };
  },
  created() {
    this.subject = this.$route.params.subject;
  },
  async mounted() {
    this.$store.dispatch('setLoading', true); // Start loading
    try {
      this.pdfList = await FilesService.fetchPDFs(this.subject); // Fetch the name and download links of the pdf files
      this.$store.dispatch('setLoading', false); // Loading done
    } catch (error) {
      this.$store.commit('SET_ERROR', "Er ging iets mis bij het ophalen van de bestanden. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
      console.error("Failed to fetch files: ", err);
      this.$store.dispatch('setLoading', false); // Loading done
    }
  },
  methods: {
    openNewTab(url) {
      // Open pdf in new tab
      window.open(url, '_blank');
    }
  }
}
</script>