<template>
    <v-list
        class="mt-10"
        lines="two"
    >
        <v-list-subheader class="mb-5 text-h5 text-primary">
            Kennisbase
        </v-list-subheader>
        <v-divider></v-divider>
        <v-list-item
            class="pl-5"
            value="testProcedures"
            title="Testprocedures"
            append-icon="mdi-chevron-right"
            @click="navigateTo('testprocedures')"
        >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            class="pl-5"
            value="modifications"
            title="Documentatie huidige situatie en modificaties"
            append-icon="mdi-chevron-right"
            @click="navigateTo('documentatie-modificaties')"
        >
        </v-list-item>
        <v-divider></v-divider>
    </v-list>   
</template>

<script>
export default {
    methods: {
        navigateTo(subject) {
            this.$router.push(`/${subject}`);
        }
    }
}
</script>

<style>

</style>