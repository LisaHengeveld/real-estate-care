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

    <!-- Field for uploading photos -->
    <v-file-input
      label="Upload foto's"
      multiple
      @change="handlePhotos"
    ></v-file-input>

    <div class="photo-container">
      <!-- Display thumbnails of selected photos -->
      <div v-for="(photo, index) in photoURLs" :key="index" @click="openPreview(photo)">
        <div class="photo-wrapper">
          <img :src="photo" :alt="'Photo ' + index">
          <v-btn 
              class="delete-photo-btn"
              density="comfortable"
              size="small"
              variant="flat"
              icon
              @click.stop="deletePhoto(index)"
            >
              <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Dialog for photo preview -->
    <v-dialog v-model="previewDialog" max-width="600px">
      <v-card>
        <v-img :src="selectedPhoto"></v-img>
      </v-card>
    </v-dialog>

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
    photosToDelete: [],
    selectedPhoto: '',
    previewDialog: false,
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
    handlePhotos(e) {
      // Get a list of selected files
      const selectedFiles = Array.from(e.target.files);

      // Append new files to the existing list
      for (let file of selectedFiles) {
        // Check if the file is already in the list to prevent duplicates
        if (!this.photos.some(existingFile => existingFile.name === file.name)) {
          this.photos.push(file);

          // Read and add the file data URL for preview
          let reader = new FileReader();
          reader.onload = (e) => {
            this.photoURLs.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    deletePhoto(index) {
      const photoToDelete = this.photoURLs[index];
      
      // Add the photo to the list of photos to delete upon form submission
      this.photosToDelete.push(photoToDelete);
      
      // Remove the photo from the local state immediately for UI update
      this.photoURLs.splice(index, 1);
      
      // If it's a newly added photo that hasn't been uploaded yet, remove from `photos`
      const newPhotoIndex = this.photos.findIndex(p => p === photoToDelete);
      if (newPhotoIndex !== -1) {
        this.photos.splice(newPhotoIndex, 1);
      }
    },
    openPreview(photo) {
      this.selectedPhoto = photo;
      this.previewDialog = true;
    },
    async submitForm() {
      // Validate the form
      this.formValid = await this.$refs.formDamagesRef.validate();
      // If the form is valid, proceed with submission
      if (this.formValid.valid) {
        try {
          // Delete photos marked for deletion
          for (const photoUrl of this.photosToDelete) {
            await FilesService.deletePhoto(photoUrl);
          }

          // Upload photos and get their URLs
          let uploadedPhotoURLs = await Promise.all(this.photos.map(photo => FilesService.uploadPhoto(this.inspectionId, photo)));

          // Filter out any deleted photos from the damage.photos array
          const remainingPhotos = this.damage.photos.filter(
            (p) => !this.photosToDelete.includes(p)
          );

          // Combine the remaining photos with the newly uploaded ones
          this.damage.photos = [...remainingPhotos, ...uploadedPhotoURLs];

          // Clear the photos array, photos to delete, and file input
          this.photos = [];
          this.photoURLs = [];
          this.photosToDelete = [];

          // Emit an event to notify the parent component to save this form.
          this.$emit('submit-form');
        } catch (error) {
          this.$store.commit('SET_ERROR', "Er ging iets mis bij het opslaan van de foto's. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
          console.error("Error uploading photos:", error);
        }
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
  .photo-container {
    display: flex;
  }

  .photo-wrapper {
    position: relative;
    display: inline-block;
    margin-inline-end: 10px;
  }

  .photo-wrapper img {
    display: block;
    width: 100px;
    height: auto;
  }

  .delete-photo-btn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 3px;
    color: rgb(var(--v-theme-error));
  }
</style>