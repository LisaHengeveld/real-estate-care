<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
            Wijzig uw gegevens
        </div>
        <v-form class="ma-5 email-form" ref="emailForm" @submit.prevent="updateUserEmail">

            <!-- Email address -->
            <v-text-field
                class="mb-3"
                label="E-mailadres"
                v-model="userEmail"
                variant="outlined"
                type="text"
                color="primary"
                :rules="[rules.required, rules.email]"
            ></v-text-field>

            <!-- Submit button -->
            <v-btn
                class="mt-3 me-4"
                type="submit"
                color="primary"
                width="110px"
            > 
                Bevestig
            </v-btn>

            <!-- Delete form button -->
            <v-btn
                class="mt-3 me-4"
                color="red-darken-3"
                width="110px"
                @click="cancel()"
            > 
                Annuleer
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";

export default {
    data() {
        return {
            userEmail: "",
            rules: {
                required: value => !!value || 'Verplicht',
                email: value => {
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Ongeldig e-mailadres.';
                }
            },
            formValid: null
        }
    },
    mounted() {
        this.loadCurrentUserEmail();
    },
    methods: {
        async loadCurrentUserEmail() {
            const email = await AuthenticationService.getEmail();
            if (email) {
                this.userEmail = email; // Load the email into the text field
            } else {
                this.$store.commit('SET_ERROR', `Het huidige e-mailadres kon niet worden geladen. Log opnieuw in of neem contact op met de beheerder.`); // Show error message
            }
        },
        // Change email
        async updateUserEmail() {
            // Validate the form
            this.formValid = await this.$refs.emailForm.validate();
            // If the form is valid, proceed with submission
            if (this.formValid.valid) {
                try {
                    // Update email
                    await AuthenticationService.updateEmail(this.userEmail);
                    // Show snackbar with confirmation 
                    this.$store.dispatch('showSnackbar', 'E-mailadres gewijzigd.');
                    // Redirect to settings
                    this.$router.push({ name: 'instellingen' });
                } catch (error) {
                    this.$store.commit('SET_ERROR', `Er ging iets mis met het bijwerken van het e-mailadres: ${error.message} Neem eventueel contact op met de beheerder.`); // Show error message
                    console.error("Email update error:", error);
                }
            }
        },

        // Cancel and send back to settings
        cancel() {
            this.$router.push({ name: 'instellingen' });
        }
    },
    
}
</script>

<style scoped>
    .email-form ::v-deep .v-text-field {
        max-width: 750px;
    }
</style>