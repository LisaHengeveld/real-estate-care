<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
            Wijzig uw wachtwoord
        </div>
        <v-form
            ref="passwordForm"
            class="ma-5 password-form"
            @submit.prevent="changePassword">

            <!-- Current Password -->
            <v-text-field
                v-model="currentPassword"
                :append-inner-icon="visibleCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleCurrentPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                class="mb-3"
                label="Huidige wachtwoord"
                variant="outlined"
                color="primary"
                @click:append-inner="visibleCurrentPassword = !visibleCurrentPassword"
            ></v-text-field>

            <!-- New Password -->
            <v-text-field
                v-model="newPassword"
                :append-inner-icon="visibleNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleNewPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.min, rules.passwordsMatch]"
                class="mb-3"
                label="Nieuw wachtwoord"
                variant="outlined"
                color="primary"
                @click:append-inner="visibleNewPassword = !visibleNewPassword"
            ></v-text-field>

            <!-- Confirm New Password -->
            <v-text-field
                v-model="confirmPassword"
                :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleConfirmPassword ? 'text' : 'password'"
                :rules="[rules.required, rules.min]"
                label="Bevestig nieuw wachtwoord"
                variant="outlined"
                color="primary"
                @click:append-inner="visibleConfirmPassword = !visibleConfirmPassword"
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
    name: "UpdatePassword",
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
                passwordsMatch: () => {
                    return this.newPassword === this.confirmPassword || 'Wachtwoorden komen niet overeen';
                }
            },
            formValid: null
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
                    if (error.code === 'auth/invalid-login-credentials') {
                        this.$store.commit('SET_ERROR', 'Het huidige wachtwoord is niet juist.'); // Show specific error message for wrong password
                    } else {
                        // Handle other errors
                        this.$store.commit('SET_ERROR', `Er ging iets mis met het bijwerken van het wachtwoord. Neem eventueel contact op met de beheerder.`); // Show general error message
                    }
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
    .password-form ::v-deep .v-text-field {
        max-width: 750px;
    }
</style>