<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
            Wijzig uw wachtwoord
        </div>
        <v-form class="ma-5 password-form" ref="passwordForm" @submit.prevent="changePassword">

            <!-- Current Password -->
            <v-text-field
                class="mb-3"
                label="Huidige wachtwoord"
                v-model="currentPassword"
                variant="outlined"
                :append-inner-icon="visibleCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleCurrentPassword ? 'text' : 'password'"
                @click:append-inner="visibleCurrentPassword = !visibleCurrentPassword"
                color="primary"
                :rules="[rules.required, rules.min]"
            ></v-text-field>

            <!-- New Password -->
            <v-text-field
                class="mb-3"
                label="Nieuw wachtwoord"
                v-model="newPassword"
                variant="outlined"
                :append-inner-icon="visibleNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleNewPassword ? 'text' : 'password'"
                @click:append-inner="visibleNewPassword = !visibleNewPassword"
                color="primary"
                :rules="[rules.required, rules.min]"
            ></v-text-field>

            <!-- Confirm New Password -->
            <v-text-field
                label="Bevestig nieuw wachtwoord"
                v-model="confirmPassword"
                variant="outlined"
                :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleConfirmPassword ? 'text' : 'password'"
                @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
                color="primary"
                :rules="[rules.required, rules.min]"
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
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            visibleCurrentPassword: false,
            visibleNewPassword: false,
            visibleConfirmPassword: false,
            rules: {
                required: value => !!value || 'Verplicht',
                min: v => v.length >= 8 || 'Minimaal 8 karakters',
                passwordsMatch: (newPassword) => {
                    return confirmPassword.value === newPassword || 'Wachtwoorden komen niet overeen';
                }
            },
            formValid: null
        }
    },
    methods: {
        // Change password
        async changePassword() {
            // Validate the form
            this.formValid = await this.$refs.passwordForm.validate();
            // If the form is valid, proceed with submission
            if (this.formValid.valid) {
                try {
                    await AuthenticationService.updatePassword(this.currentPassword, this.newPassword);
                    // Show snackbar with confirmation 
                    this.$store.dispatch('showSnackbar', 'Wachtwoord gewijzigd.');
                    // Redirect to settings
                    this.$router.push({ name: 'instellingen' });
                } catch (error) {
                    this.$store.commit('SET_ERROR', `Er ging iets mis met het bijwerken van het wachtwoord: ${error.message} Neem eventueel contact op met de beheerder.`); // Show error message
                    console.error("Password change error:", error);
                }
            }
        },

        // Cancel and send back to settings
        cancel() {
            this.$router.push({ name: 'instellingen' });
        }
    },
    beforeRouteLeave(to, from, next) {
        // Clear the data properties
        this.currentPassword = "",
        this.newPassword = "",
        this.confirmPassword = "",
        this.visibleCurrentPassword = false,
        this.visibleNewPassword = false,
        this.visibleConfirmPassword = false

        // Proceed with navigation
        next();
    }
}
</script>

<style scoped>
    .password-form ::v-deep .v-text-field {
        max-width: 750px;
    }
</style>