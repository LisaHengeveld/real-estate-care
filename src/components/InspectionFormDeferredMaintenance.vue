<template>
    <v-form
      ref="formDeferredMaintenanceRef"
      class="pt-2"
      @submit.prevent="submitForm"
    >
  
      <!-- Textfield for location maintenance -->
      <v-text-field
        v-model="maintenance.location"
        :rules="[rules.required]"
        color="primary"
        label="Locatie*"
        variant="outlined"
      ></v-text-field>
  
      <!-- Select field for kind of maintenance -->
      <v-select
        v-model="maintenance.kind"
        label="Soort onderhoud*"
        :items="[
          'Schilderwerk',
          'Houtrot',
          'Elektra',
          'Leidingwerk',
          'Beglazing',
        ]"
        :rules="[rules.required]"
        class="mt-2"
        color="primary"
        variant="outlined"
      >
        <!-- Hide counter by passing an empty counter slot -->
        <template #counter></template>
      </v-select>
  
      <!-- Radio group yes/no if acute action is required -->
      <v-radio-group
        v-model="maintenance.urgent"
        :rules="[rules.required]"
        color="primary"
        inline
      >
        <template #label>
          <div>Accute actie vereist*</div>
        </template>
        <v-radio label="Ja" value="Ja"></v-radio>
        <v-radio label="Nee" value="Nee"></v-radio>
      </v-radio-group>
  
      <!-- Select field for cost indication -->
      <v-select
        v-model="maintenance.costIndication"
        label="Kostenindicatie*"
        :items="[
          '0-500',
          '500-1.500',
          '1.500+',
        ]"
        :rules="[rules.required]"
        color="primary"
        variant="outlined"
      >
        <!-- Hide counter by passing an empty counter slot -->
        <template #counter></template>
      </v-select>

      <!-- Field for uploading photos -->
      <inspection-form-photo-upload
        ref="photoUpload"
        :inspection-id="this.inspectionId"
        :task="'Deferred Maintenance'"
        :uploaded-photos="typeof maintenance.photos !== 'undefined' ? maintenance.photos : []" 
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
  import InspectionFormPhotoUpload from "@/components/InspectionFormPhotoUpload.vue";

  export default {
    name: "InspectionFormDeferredMaintenance",
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
      rules: {
        required: value => !!value || 'Veld is verplicht',
      },
      formValid: null
    }),
    computed: {
      // Get data
      maintenance() {
        return this.$store.getters.getDeferredMaintenance(this.inspectionId, this.index);
      },
    },
    methods: {
      async submitForm() {
        // Validate the form
        this.formValid = await this.$refs.formDeferredMaintenanceRef.validate();
        // If the form is valid, proceed with submission
        if (this.formValid.valid) {
          // Upload photos
          this.maintenance.photos = await this.$refs.photoUpload.uploadPhotos();

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