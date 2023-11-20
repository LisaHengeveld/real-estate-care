<template>
    <div>
        <div class="mx-4 mt-13 mb-5 text-h5 text-primary">
            Reset database
        </div>
        <div class="mx-4">
            <p class="mb-3">Via onderstaande knop kan de database gereset worden naar de oorspronkelijke staat. Geuploade foto's en profielfoto's zullen worden verwijdererd.</p>
            <p>Deze optie is bedoeld voor het kunnen testen van het prototype van deze applicatie door meerdere mensen. Deze functie zal niet terugkomen in de uiteindelijke applicatie voor de werknemers van Real Estate Care.</p>
        </div>
        <div class="text-center mt-10">
            <v-btn
                color="error"
                prepend-icon="mdi-database-refresh"
                size="large"
                rounded="lg"
                @click="this.confirmResetDialog = true;"
            >
                Reset database
            </v-btn>
        </div>   

        <!-- Confirmation dialog -->
        <confirmation-dialog
            v-if="confirmResetDialog"
            @confirmed="resetDatabase"
            @canceled="confirmResetDialog = false"
        >
        <template #title>
            <p>Data resetten?</p>
        </template>   
            <template #text>
            <p>Weet u zeker dat u alle data wilt herstellen?</p>
            <p>Deze actie kan niet ongedaan gemaakt worden.</p>
            </template>  
        </confirmation-dialog>
    </div>
</template>

<script>
import ConfirmationDialog from "@/components/ConfirmationDialog.vue"
import InspectionsService from "@/services/InspectionsService.js";
import FilesService from "@/services/FilesService.js";
import AuthenticationService from "@/services/AuthenticationService.js";
import jsonData from "@/data/db.json";

export default {
    data() {
        return {
            confirmResetDialog: false
        }
    },
    methods: {
        async resetDatabase() {
            this.confirmResetDialog = false;
            this.$store.dispatch('setLoading', true); // Start loading
            try {
                // Delete profile picture if it exists
                const userID = AuthenticationService.fetchUserID();
                const profilePictureUrl = AuthenticationService.getProfilePictureUrl() || '';
                if (profilePictureUrl) {
                    FilesService.deleteProfilePicture(userID);
                    AuthenticationService.updateProfilePicture('');
                }

                // Delete all uploaded photos
                await FilesService.deleteAllPhotos();

                // // Reset database
                await InspectionsService.resetDatabase(jsonData);

                this.$store.dispatch('setLoading', false); // Loading done
                this.$store.dispatch('showSnackbar', 'Data gereset.'); // Show snackbar with confirmation 
            } catch (error) {
                this.$store.commit('SET_ERROR', "Er ging iets mis bij resetten van de database. Zie de console voor details."); // Show error message
                console.error("Error resetting the database:", error);
                this.$store.dispatch('setLoading', false); // Loading done
            }
        }
  },
  components: { ConfirmationDialog }
}
</script>