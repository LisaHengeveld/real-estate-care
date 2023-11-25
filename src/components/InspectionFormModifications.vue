<template>
    <v-form
      ref="formModificationsRef"
      class="pt-2"
      @submit.prevent="submitForm"
    >

      <!-- Link to pdf-file on current state and modifications -->
      <div 
        v-if="documentation"
        class="mt-2 mb-7 ml-1"
      >
        <p>
          Huidige staat / modificaties:
          <a href="#" class="text-primary" @click.prevent="openPdf(documentation)">
            {{ documentation }}
            <v-icon 
              class="ml-1" 
              icon="mdi-open-in-new" 
              size="x-small"
            ></v-icon>
          </a>
        </p>  
      </div>
  
      <!-- Textfield for location modification -->
      <v-text-field
        v-model="modification.location"
        :rules="[rules.required]"
        class="mt-2"
        color="primary"
        label="Locatie aangetroffen modificatie*"
        variant="outlined"
      ></v-text-field>
  
      <!-- Select field for kind of modification -->
      <v-select
        v-model="modification.executedBy"
        label="Uitgevoerd door*"
        :items="[
          'Huurder',
          'Aannemer',
          'Onbekend'
        ]"
        :rules="[rules.required]"
        class="mt-2"
        color="primary"
        variant="outlined"
      >
        <!-- Hide counter by passing an empty counter slot -->
        <template #counter></template>
      </v-select>
  
      <!-- Text area for description of modification -->
      <v-textarea
        v-model="modification.description"
        :rules="[rules.required]"
        class="mt-2"
        color="primary"
        label="Omschrijving*"
        variant="outlined"
      ></v-textarea>

      <!-- Select field for action to be taken -->
      <v-select
        v-model="modification.action"
        label="Te ondernemen actie*"
        :items="[
          'Accepteren',
          'Laten keuren',
          'Laten verwijderen',
          'Laten aanpassen en keuren'
        ]"
        :rules="[rules.required]"
        class="mt-2"
        color="primary"
        variant="outlined"
      >
        <!-- Hide counter by passing an empty counter slot -->
        <template #counter></template>
      </v-select>

      <!-- Text area for comments -->
      <v-textarea
        v-model="modification.comments"
        class="mt-2"
        color="primary"
        label="Opmerkingen"
        variant="outlined"
      ></v-textarea>

      <!-- Field for uploading photos -->
      <inspection-form-photo-upload
        ref="photoUpload"
        :inspection-id="this.inspectionId"
        :task="'Modifications'"
        :uploaded-photos="typeof modification.photos !== 'undefined' ? modification.photos : []" 
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
    name: "InspectionFormModifications",
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
      },
      documentation: {
        type: String,
        required: true
      }
    },
    data: () => ({
      rules: {
        required: value => !!value || 'Veld is verplicht',
      },
      formValid: null
    }),
    computed: {
      // Get data
      modification() {
        return this.$store.getters.getModification(this.inspectionId, this.index);
      }
    },
    methods: {
      // Get file name and download URL of documentation of current building
      async openPdf(fileName) {
        if (!fileName) return;
        try {
          const directory = "Documentenarchief";
          const fileData = await FilesService.fetchPDFFile(directory, fileName);
          window.open(fileData.url, '_blank');
        } catch (error) {
          this.$store.commit('SET_ERROR', "Er ging iets mis bij het ophalen van de documentatie. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
        }
      },
      async submitForm() {
        // Validate the form
        this.formValid = await this.$refs.formModificationsRef.validate();
        // If the form is valid, proceed with submission
        if (this.formValid.valid) {
          // Upload photos
          this.modification.photos = await this.$refs.photoUpload.uploadPhotos();

          // Emit an event to notify the parent component to save this form.
          this.$emit('submit-form');
        }
      },
      deleteForm() {
        // Emit an event to notify the parent component to delete this form.
        this.$emit('delete-form');
      }
    },
  };
  </script>
  