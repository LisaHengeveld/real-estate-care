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
    import { ref } from "vue";
    import { useRouter } from 'vue-router';
    import AuthenticationService from "@/services/AuthenticationService.js";

    const email = ref("");
    const password = ref("");
    const errorMessage = ref();
    const router = useRouter();

    const login = () => {
        AuthenticationService.login(email.value, password.value)
        .then(() => {
            router.push('/');
        })
        .catch((error) => {
            errorMessage.value = "Ongeldig e-mailadres en/of wachtwoord.";
            console.error("Login error:", error);
        });
    };
</script>

<style scoped>
    .banner-top {
        position: fixed;
        right: 0;
    }

    .banner-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
    }

    .error-message {
        margin-block-end: 25px;
    }
</style>