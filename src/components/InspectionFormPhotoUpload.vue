<template>
    <div>
        <!-- Field for uploading photos -->
        <v-file-input
            label="Upload foto's"
            multiple
            accept="image/*"
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
    </div>
</template>

<script>
import FilesService from "@/services/FilesService.js";

export default {
    data: () => ({
        photos: [],
        photoURLs: [],
        photosToDelete: [],
        fileMap: {},
        selectedPhoto: '',
        previewDialog: false,
    }),

    async mounted() {
        if (this.uploadedPhotos) {
            this.photoURLs = [...this.uploadedPhotos];
        }
    },

    props: {
        inspectionId: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true,
            validator: function (value) {
                const allowedTypes = ['Damages', 'Deferred Maintenance', 'Technical Installations', 'Modifications'];
                return allowedTypes.includes(value);
            }
        },
        uploadedPhotos: {
            type: Array,
            required: true
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
                        this.fileMap[file.name] = e.target.result; // Map the file name to its data URL
                    };
                    reader.readAsDataURL(file);
                }
            }
        },

        deletePhoto(index) {
            const photoToDelete = this.photoURLs[index];
            const fileNameToDelete = Object.keys(this.fileMap).find(name => this.fileMap[name] === photoToDelete);
            
            // Add the photo to the list of photos to delete upon form submission
            this.photosToDelete.push(photoToDelete);
            
            // Remove the photo from the local state immediately for UI update
            this.photoURLs.splice(index, 1);
            
            // If it's a newly added photo that hasn't been uploaded yet, remove from 'photos'
            if (fileNameToDelete) {
                // Find the index in the 'photos' array using the file name
                const newPhotoIndex = this.photos.findIndex(p => p.name === fileNameToDelete);

                if (newPhotoIndex !== -1) {
                    this.photos.splice(newPhotoIndex, 1); // Remove the file from the 'photos' array
                }

                // Remove the file from the 'fileMap'
                delete this.fileMap[fileNameToDelete];
            }
        },

        openPreview(photo) {
            this.selectedPhoto = photo;
            this.previewDialog = true;
        },
        
        async uploadPhotos() {
            try {
                // Delete photos marked for deletion
                for (const photoUrl of this.photosToDelete) {
                    // Only attempt deletion if the photo URL exists in the uploadedPhotos
                    if (this.uploadedPhotos.includes(photoUrl)) {
                        await FilesService.deletePhoto(photoUrl);
                    }
                }

                // Filter out any deleted photos from the uploaded photos array
                const remainingPhotos = this.uploadedPhotos.filter(
                    (p) => !this.photosToDelete.includes(p)
                );

                // Upload photos and get their URLs
                // Excludes photos that were already uploaded before
                let uploadedPhotoURLs = await Promise.all(this.photos.map(photo => FilesService.uploadPhoto(`${this.inspectionId}/${this.task}`, photo)));
                uploadedPhotoURLs = uploadedPhotoURLs.filter(url => url !== null);

                // Combine the remaining photos with the newly uploaded ones
                const photosToSubmit = [...remainingPhotos, ...uploadedPhotoURLs];

                // Clear the photos array, photos to delete, and file input
                this.photos = [];
                this.photoURLs = [];
                this.photosToDelete = [];

                return photosToSubmit;
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij het opslaan van de foto's. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
                console.error("Error uploading photos:", error);
            }   
        },
    }
}
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