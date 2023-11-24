<template>
    <div>
        <!-- Banner on top of screen -->
        <v-img
            class="banner-top"
            src="@/assets/banner-top.png"
            alt=""
            max-width="1000px"
            width="100%"
        ></v-img>

        <!-- Banner on bottom of screen -->
        <v-img
            class="banner-bottom"
            src="@/assets/banner-bottom.png"
            alt=""
            max-width="1000px"
            width="100%"
        ></v-img>

        <!-- Login form -->
        <v-container>
            <v-row 
                align="center"
                justify="center"
                style="height:100vh"
            >
                <v-col align="center">
                    <v-card
                        color="primary"
                        max-width="350px"
                    >
                        <v-card-title class="py-5">
                            <v-img
                                src="@/assets/logo-white.png"
                                alt="Real Estate Care"
                                width="80%"
                            ></v-img>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="login-form">
                                <p 
                                    v-if="errorMessage"
                                    class="error-message"
                                >
                                    {{ errorMessage }}
                                </p>
                                <v-text-field
                                    v-model="email"
                                    class="mb-10"
                                    label="E-mail"
                                    prepend-inner-icon="mdi-account"
                                    variant="outlined"
                                    hide-details
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    type="password"
                                    label="Wachtwoord"
                                    prepend-inner-icon="mdi-lock"
                                    variant="outlined"
                                    required
                                ></v-text-field>
                                <v-btn
                                    class="mt-2"
                                    color="white"
                                    variant="flat"
                                    @click="login"
                                >
                                    Inloggen
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from 'vue-router';
    import { useStore } from "vuex";
    import AuthenticationService from "@/services/AuthenticationService.js";

    const email = ref("");
    const password = ref("");
    const errorMessage = ref();
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
        store.dispatch('setIsLoggedIn', false);
    });

    const login = () => {
        AuthenticationService.login(email.value, password.value)
        .then(() => {
            // Simulate sending a two factor authentication code
            const fake2FACode = Math.floor(100000 + Math.random() * 900000).toString(); // A 6-digit code
            localStorage.setItem('fake2FACode', fake2FACode); // Save to local storage

            // Slight delay to give Google Chrome time to set the item to local storage (not needed for Firefox)
            setTimeout(() => {
                // Prompt the user to enter the 2FA code
                const userEnteredCode = prompt("Voer de 2FA-code in (zie local storage):");            

                // Verify the 2FA code
                if (userEnteredCode === localStorage.getItem('fake2FACode')) {
                    localStorage.removeItem('fake2FACode'); // Clear the fake 2FA code from localStorage
                    store.dispatch('fetchInspections'); // Fill the store with the data
                    router.push('/'); // Proceed with the navigation
                    store.dispatch('setIsLoggedIn', true); // The user is fully authenticated
                } else {
                    errorMessage.value = "Ongeldige code. Log nogmaals in en voer de nieuwe code in.";
                }
            }, 500);
        })
        .catch((error) => {
            errorMessage.value = "Ongeldig e-mailadres en/of wachtwoord.";
        });
    };
</script>

<style scoped>
    .banner-top {
        position: fixed;
        top: 0;
        right: 0;
    }

    .banner-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .error-message {
        margin-block-end: 25px;
    }
</style>