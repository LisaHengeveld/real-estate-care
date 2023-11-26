<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
            Wijzig uw profielfoto
        </div>
        <div class="text-center">
            <!-- Show profile picture if available -->
            <img 
                v-if="profilePictureUrl"
                :src="profilePictureUrl"
                alt="Profielfoto"
                class="profile-picture"
            >
            
            <!-- Show emoticon when profile picture is not available -->
            <v-icon
                v-else
                class="ma-5"
                color="primary-lighten-1"
                icon="mdi-emoticon"
                size="300"
            ></v-icon>
        </div>
        <div class="text-center">
            <!-- File input field (hidden) -->
            <input
                type="file"
                ref="fileInput"
                accept="image/*"
                style="display: none;"
                @change="onFileSelected"
            />

            <!-- Button to trigger the file input and save new profile picture -->
            <v-btn
                color="primary"
                prepend-icon="mdi-pencil"
                @click="triggerFileInput"
            >
                Wijzig profielfoto
            </v-btn>

            <!-- Button to delete profile picture -->
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
    name: "UpdateAvatar",
    created() {
        this.fetchUserID();
        this.fetchProfilePicture();
    },
    data() {
        return {
            userID: '',
            profilePictureUrl: '',
        };
    },
    methods: {
        // Get user id
        fetchUserID() {
            this.userID = AuthenticationService.fetchUserID();
        },
        // Fetch profile picture url
        fetchProfilePicture() {
            this.profilePictureUrl = AuthenticationService.getProfilePictureUrl() || '';
        },
        // Trigger the hidden file input
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        // Upload profile picture when selected
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
                this.$store.commit('SET_ERROR', "Er ging iets mis met het uploaden van de profielfoto. Zorg ervoor dat het bestand dat u uploadt een afbeelding is met een van de volgende extensies: .jpg, .jpeg, .png, of .gif. Andere bestandstypes zijn niet toegestaan."); // Show error message
            }
        },
        // Save the profile picture url to user authentication profile
        async updateUserAuthProfile(photoURL) {
            try {
                await AuthenticationService.updateProfilePicture(photoURL);
                this.fetchProfilePicture(); // Update the profile picture URL in the component
                this.$store.dispatch('showSnackbar', 'Profielfoto gewijzigd.'); // Show snackbar with confirmation 
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis met het updaten van de profielfoto. Zorg ervoor dat het bestand dat u uploadt een afbeelding is met een van de volgende extensies: .jpg, .jpeg, .png, of .gif. Andere bestandstypes zijn niet toegestaan."); // Show error message
            }
        },
        // Delete the profile picture from the database
        async deleteProfilePicture() {
            if (!this.profilePictureUrl) {
                this.$store.dispatch('showSnackbar', 'Geen profielfoto beschikbaar om te verwijderen.'); // Show snackbar with message that there is no profile picture available to delete
                return;
            }
            try {
                FilesService.deleteProfilePicture(this.userID); // Delete profile picture
                AuthenticationService.updateProfilePicture(''); // Delete profile picture url from user authentication profile
                this.profilePictureUrl = ''; // Delete url so that emoticon will be shown
                this.$store.dispatch('showSnackbar', 'Profielfoto verwijderd.'); // Show snackbar with confirmation
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij het verwijderen van uw profielfoto. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
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