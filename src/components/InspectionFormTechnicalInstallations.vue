<template>
  <v-form
    ref="formTechnicalInstallationsRef"
    class="pt-2"
    @submit.prevent="submitForm"
  >
  
    <!-- Textfield for location installation -->
    <v-text-field
      v-model="installation.location"
      :rules="[rules.required]"
      color="primary"
      label="Locatie*"
      variant="outlined"
    ></v-text-field>

    <!-- Select field for kind of installation -->
    <v-select
      v-model="installation.kind"
      label="Soort installatie*"
      :items="[
        'Koeling',
        'Verwarming',
        'Luchtverversing',
        'Elektra',
        'Beveiliging',
      ]"
      :rules="[rules.required]"
      class="mt-2"
      color="primary"
      variant="outlined"
    >
      <!-- Hide counter by passing an empty counter slot -->
      <template v-slot:counter></template>
    </v-select>

    <!-- Textfield for reported malfunctions -->
    <v-text-field
      v-model="installation.reportedMalfunctions"
      class="mt-2"
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
        v-model="selectedTestProcedure"
        label="Testprocedure*"
        :items="testProceduresList"
        :rules="[rules.required]"
        hint="Let op: De testprocedure kan niet worden gewijzigd, nadat dit formulier is opgeslagen."
        class="mt-2 mb-3"
        color="primary"
        variant="outlined"
        persistent-hint
      >
        <!-- Hide counter by passing an empty counter slot -->
        <template v-slot:counter></template>
      </v-select>
    </div>

    <!-- Radio group yes/no if installation is approved -->
    <v-radio-group
      v-model="installation.approved"
      :rules="[rules.required]"
      color="primary"
      inline
    >
      <template v-slot:label>
        <div>Goedgekeurd*</div>
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

    <!-- Field for uploading photos -->
    <inspection-form-photo-upload
      ref="photoUpload"
      :inspection-id="this.inspectionId"
      :task="'Technical Installations'"
      :uploaded-photos="typeof installation.photos !== 'undefined' ? installation.photos : []" 
    />

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
  import InspectionFormPhotoUpload from "@/components/InspectionFormPhotoUpload.vue";

  export default {
    name: "InspectionFormTechnicalInstallations",
    components: {
      InspectionFormPhotoUpload
    },
    props: {
      inspectionId: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true,
        validator: function (value) {
          return Number.isInteger(value) && value >= 0;
        }
      }
    },
    data: () => ({
      selectedTestProcedure: null,
      testProceduresList: [],
      rules: {
        required: value => !!value || 'Veld is verplicht',
        formValid: null
      },
    }),
    computed: {
      // Get data
      installation() {
        return this.$store.getters.getTechnicalInstallation(this.inspectionId, this.index);
      },
    },
    mounted() {
      this.fetchPdfList(); // Get file names of all testprocedures
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

          // Upload photos
          this.installation.photos = await this.$refs.photoUpload.uploadPhotos();

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
  