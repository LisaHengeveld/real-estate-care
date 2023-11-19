<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
            Wijzig uw profielfoto
        </div>
        <div class="text-center">
            <img 
                v-if="profilePictureUrl"
                :src="profilePictureUrl"
                alt="Profielfoto"
                class="profile-picture">
            <v-icon
                v-else
                class="ma-5"
                color="primary-lighten-1"
                icon="mdi-emoticon"
                size="300"
            ></v-icon>
        </div>
        <div class="text-center">
            <!-- Input field (hidden) -->
            <input
                type="file"
                ref="fileInput"
                @change="onFileSelected"
                accept="image/*"
                style="display: none;"
            />

            <!-- Button to trigger the file input and save new profile picture -->
            <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                @click="triggerFileInput"
            >
                Wijzig profielfoto
            </v-btn>
            <v-btn
                class="ml-1 btn-delete"
                color="error"
                icon="mdi-delete"
                @click="deleteProfilePicture"
            ></v-btn>
        </div>   
    </div>
</template>

<script>
import FilesService from "@/services/FilesService.js";
import AuthenticationService from "@/services/AuthenticationService.js";

export default {
    data() {
        return {
            userID: '',
            profilePictureUrl: '', // This will hold the profile picture URL
        };
    },
    created() {
        this.fetchUserID();
        this.fetchProfilePicture();
    },
    methods: {
        fetchUserID() {
            this.userID = AuthenticationService.fetchUserID();
        },
        fetchProfilePicture() {
            this.profilePictureUrl = AuthenticationService.getProfilePictureUrl() || '';
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        async onFileSelected(event) {
            // Handle the file selected by the user
            const file = event.target.files[0];
            if (!file) {
                return;
            }
            try {
                const profilePictureURL = await FilesService.uploadProfilePicture(file, this.userID);
                this.updateUserAuthProfile(profilePictureURL);
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij het uploaden van de profielfoto. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
                console.error("Error uploading file:", error);
            }
        },
        async updateUserAuthProfile(photoURL) {
            try {
                await AuthenticationService.updateProfilePicture(photoURL);
                this.fetchProfilePicture(); // Update the profile picture URL in the component
                this.$store.dispatch('showSnackbar', 'Profielfoto gewijzigd.'); // Show snackbar with confirmation 
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij het updaten van uw profielfoto. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
                console.error("Error updating profile picture: ", error);
            }
        },
        async deleteProfilePicture() {
            if (!this.profilePictureUrl) {
                this.$store.dispatch('showSnackbar', 'Geen profielfoto beschikbaar om te verwijderen.'); // Show snackbar with confirmation
                return;
            }
            try {
                FilesService.deleteProfilePicture(this.userID);
                AuthenticationService.updateProfilePicture('');
                this.profilePictureUrl = '';
                this.$store.dispatch('showSnackbar', 'Profielfoto verwijderd.'); // Show snackbar with confirmation
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij het verwijderen van uw profielfoto. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
                console.error("Error deleting profile picture: ", error);
            }
        }
    },    
}
</script>

<style scoped>
    .profile-picture {
        margin: 40px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        object-fit: cover;
    }

    .btn-delete {
        border-radius: 4px;
        width: 36px;
        height: 36px;
    }
</style>