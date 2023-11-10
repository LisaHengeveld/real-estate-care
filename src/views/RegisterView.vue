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
                        <v-card-title class="pt-3">
                            <v-img
                                width="80%"
                                src="@/assets/img/logo-white.png"
                            ></v-img>
                        </v-card-title>
                        <v-card-text>
                            <v-form class="login-form">
                                <v-text-field
                                    class="my-5"
                                    v-model="email"
                                    label="E-mail"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    hide-details
                                    required
                                ></v-text-field>
                                <v-text-field
                                    class="my-5"
                                    v-model="password"
                                    label="Wachtwoord"
                                    type="password"
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    required
                                ></v-text-field>
                                <v-btn @click="register" class="mt-2" color="white" variant="flat">Registreren</v-btn>
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
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from 'vue-router';

    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log("Successfully registered!");
                console.log(auth.currentUser);
                router.push('/')
            })
            .catch((error) => {
                console.log(error.code);
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
</style>