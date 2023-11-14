<template>
  <v-form class="pt-2" ref="formTechnicalInstallationsRef" @submit.prevent="submitForm">
  
    <!-- Textfield for location installation -->
    <v-text-field
      v-model="installation.location"
      color="primary"
      label="Locatie"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <!-- Select field for kind of installation -->
    <v-select
      class="mt-2"
      v-model="installation.kind"
      color="primary"
      label="Soort installatie"
      :items="[
        'Koeling',
        'Verwarming',
        'Luchtverversing',
        'Elektra',
        'Beveiliging',
      ]"
      variant="outlined"
      :rules="[rules.required]"
    ></v-select>

    <!-- Textfield for reported malfunctions -->
    <v-text-field
      class="mt-2"
      v-model="installation.reportedMalfunctions"
      color="primary"
      label="Gemelde storingen"
      variant="outlined"
    ></v-text-field>

    <!-- Link to pdf-file of test procedure for this installation -->
    <div 
      v-if="installation.testProcedure"
      class="mt-2 mb-7 ml-1"
    >
      <p>
        Testprocedure:
        <a href="#" class="text-primary" @click.prevent="openPdf(installation.testProcedure)">
          {{ installation.testProcedure }}
          <v-icon 
            class="ml-1" 
            icon="mdi-open-in-new" 
            size="x-small"
          ></v-icon>
        </a>
      </p>  
    </div>

    <!-- Select field if test procedure is not available (for example, when user adds new form) -->
    <div v-else class="no-word-break">
      <v-select
        class="mt-2 mb-3"
        v-model="selectedTestProcedure"
        color="primary"
        label="Testprocedure"
        :items="testProceduresList"
        variant="outlined"
        :rules="[rules.required]"
        hint="Let op: De testprocedure kan niet worden gewijzigd, nadat dit formulier is opgeslagen."
        persistent-hint
      ></v-select>
    </div>

    <!-- Radio group yes/no if installation is approved -->
    <v-radio-group
      v-model="installation.approved"
      color="primary"
      inline
      :rules="[rules.required]"
    >
      <template v-slot:label>
        <div>Goedgekeurd</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Text area for comments -->
    <v-textarea
      v-model="installation.comments"
      color="primary"
      label="Opmerkingen"
      variant="outlined"
    ></v-textarea>

    <!-- Submit button -->
    <v-btn
        class="mt-3 me-4"
        type="submit"
        color="primary"
    > 
        Opslaan
    </v-btn>

    <!-- Delete form button -->
    <v-btn
        class="mt-3 me-4"
        color="red-darken-3"
        width="110px"
        @click="deleteForm()"
    > 
        Verwijder
    </v-btn>
  </v-form>
</template>
  
<script>
  import FilesService from "@/services/FilesService.js";

  export default {
    data: () => ({
      selectedTestProcedure: null,
      testProceduresList: [],
      rules: {
        required: value => !!value || 'Veld is verplicht',
        formValid: null
      },
    }),
    mounted() {
      this.fetchPdfList(); // Get file names of all testprocedures
    },
    props: ["inspectionId", "index"],
    computed: {
      // Get data
      installation() {
        return this.$store.getters.getTechnicalInstallation(this.inspectionId, this.index);
      },
    },
    methods: {
      // Get file names of all testprocedures
      async fetchPdfList() {
        try {
          const directory = "Testprocedures";
          const pdfList = await FilesService.fetchPDFs(directory); // Fetch files
          this.testProceduresList = pdfList.map(function (item) { return item.name; }); // Save file names to testProceduresList
        } catch (error) {
          this.$store.commit('SET_ERROR', "Er ging iets mis bij het ophalen van de testprocedures. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
          console.error("Error fetching test procedures list:", error);
        }
      },

      // Get file name and download URL of test procedure
      async openPdf(fileName) {
        try {
          const directory = "Testprocedures";
          const fileData = await FilesService.fetchPDFFile(directory, fileName);
          window.open(fileData.url, '_blank');
        } catch (error) {
          this.$store.commit('SET_ERROR', "Er ging iets mis bij het ophalen van de testprocedure. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
          console.error("Error opening PDF:", error);
        }
      },

      async submitForm() {
        // Validate the form
        this.formValid = await this.$refs.formTechnicalInstallationsRef.validate();
        // If the form is valid, proceed with submission
        if (this.formValid.valid) {
          // Save testprocedure if it was selected
          if (this.selectedTestProcedure) {
            this.installation.testProcedure = this.selectedTestProcedure;
          }
          // Emit an event to notify the parent component to save this form.
          this.$emit('submit-form');
        }
      },

      deleteForm() {
        // Emit an event to notify the parent component to delete this form.
        this.$emit('delete-form');
      }
    }
  };
</script>
  
<style scoped>
  /* Prevent word breaking in the hint message */
  .no-word-break ::v-deep .v-messages__message {
    word-break: keep-all;
    hyphens: none;
  }
</style>
  