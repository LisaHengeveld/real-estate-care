<template>
  <v-form class="pt-2" ref="formDamagesRef" @submit.prevent="submitForm">

    <!-- Textfield for location damage -->
    <v-text-field
      v-model="damage.location"
      color="primary"
      label="Locatie"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <!-- Radio group yes/no for new damage -->
    <v-radio-group
      v-model="damage.newDamage"
      color="primary"
      inline
      :rules="[rules.required]"
    >
      <template v-slot:label>
        <div>Nieuwe schade</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Select field for kind of damage -->
    <v-select
      v-model="damage.kind"
      color="primary"
      label="Soort schade"
      :items="[
        'Moedwillig',
        'Slijtage',
        'Geweld',
        'Normaal gebruik',
        'Calamiteit',
        'Anders',
      ]"
      variant="outlined"
      :rules="[rules.required]"
    ></v-select>

    <!-- Text field for date of registering damage -->
    <v-text-field
      class="mt-2"
      v-model="damage.date"
      color="primary"
      label="Datum"
      type="date"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <!-- Radio group yes/no if acute action is required -->
    <v-radio-group
      v-model="damage.urgent"
      color="primary"
      inline
      :rules="[rules.required]"
    >
      <template v-slot:label>
        <div>Accute actie vereist</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Text area for description of damage -->
    <v-textarea
      v-model="damage.description"
      color="primary"
      label="Omschrijving"
      variant="outlined"
      :rules="[rules.required]"
    ></v-textarea>

    <!-- Option to add photos -->
    <v-file-input
      label="Upload Photos"
      v-model="photos"
      multiple
      @change="handlePhotos"
    ></v-file-input>

    <div class="container-photos">
      <!-- Display thumbnails of selected photos -->
      <div v-for="(photo, index) in photoURLs" :key="index">
        <img :src="photo" :alt="'Photo ' + index">
      </div>
    </div>

    <!-- Submit button -->
    <v-btn
        class="mt-3 me-4"
        type="submit"
        color="primary"
        width="110px"
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
    photos: [],
    photoURLs: [],
    rules: {
      required: value => !!value || 'Veld is verplicht',
    },
    formValid: null
  }),
  props: ["inspectionId", "index"],
  async mounted() {
    if (this.damage.photos) {
      this.photoURLs = [...this.damage.photos];
    }
  },
  methods: {
    // This function will be triggered when the user selects files
    handlePhotos() {
      for (let file of this.photos) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.photoURLs.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      // Validate the form
      this.formValid = await this.$refs.formDamagesRef.validate();
      // If the form is valid, proceed with submission
      if (this.formValid.valid) {
        try {
          // Upload photos and get their URLs
          let uploadedPhotoURLs = await Promise.all(this.photos.map(photo => FilesService.uploadPhoto(photo)));

          // Append uploaded photo URLs to form data
          this.damage.photos = uploadedPhotoURLs
        } catch (error) {
          this.$store.commit('SET_ERROR', "Er ging iets mis bij het opslaan van de foto's. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
          console.error("Error uploading photos:", error);
        }
        // Emit an event to notify the parent component to save this form.
        this.$emit('submit-form');
      }
    },
    deleteForm() {
      // Emit an event to notify the parent component to delete this form.
      this.$emit('delete-form');
    }
  },
  computed: {
    // Get data
    damage() {
      return this.$store.getters.getDamage(this.inspectionId, this.index);
    },
  },
};
</script>

<style scoped>
  .container-photos {
    display: flex;
  }

  .container-photos img {
    max-width: 150px;
  }
</style>