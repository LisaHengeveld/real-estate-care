<template>
    <v-list
        class="mt-10"
        lines="two"
    >
        <v-list-subheader class="mb-5 text-h5 text-primary">
            Kennisbase
        </v-list-subheader>
        <v-divider></v-divider>

        <!-- List the subjects of the knowledge base -->
        <div
            v-for="(subject, index) in subjects"
            :key="index"
        >
            <v-list-item
                class="pl-5"
                :value="subject"
                :title="subject"
                append-icon="mdi-chevron-right"
                :subject="subject"
                @click="navigateTo(subject)"
            >
            </v-list-item>
            <v-divider></v-divider>
        </div>
    </v-list>   
</template>

<script>
export default {
    data() {
        return {
            subjects: [
                "Testprocedures",
                "Documentenarchief"
            ]
        }
    },
    methods: {
        navigateTo(subject) {
            this.$router.push(`kennisbase/${subject}`);
        }
    }
}
</script>

<style>

</style>