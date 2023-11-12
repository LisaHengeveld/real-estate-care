<template>
    <div>
        <!-- Banner on top of screen -->
        <v-img
            class="banner-top"
            max-width="1000px"
            width="100%"
            src="@/assets/img/banner-top.png"
        ></v-img>

        <!-- Banner on bottom of screen -->
        <v-img
            class="banner-bottom"
            max-width="1000px"
            width="100%"
            src="@/assets/img/banner-bottom.png"
        ></v-img>

        <!-- Login form -->
        <v-container>
            <v-row align="center" justify="center" style="height:100vh">
                <v-col align="center">
                    <v-card color="primary" max-width="350px">
                        <v-card-title class="py-5">
                            <v-img
                                width="80%"
                                src="@/assets/img/logo-white.png"
                            ></v-img>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="login-form">
                                <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
                                <v-text-field
                                    class="mb-10"
                                    v-model="email"
                                    label="E-mail"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    hide-details
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    label="Wachtwoord"
                                    type="password"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    required
                                ></v-text-field>
                                <v-btn @click="login" class="mt-2" color="white" variant="flat">Inloggen</v-btn>
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
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router';

    const email = ref("");
    const password = ref("");
    const errorMessage = ref();
    const router = useRouter();

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log("Successfully signed in!");
                console.log(auth.currentUser);
                router.push('/');
            })
            .catch((error) => {
                errorMessage.value = "Ongeldig e-mailadres en/of wachtwoord.";
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