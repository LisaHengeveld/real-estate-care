<template>
    <v-list
        class="mt-10 no-surface-color"
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
                :value="subject"
                :title="subject"
                :subject="subject"
                append-icon="mdi-chevron-right"
                class="pl-5"
                @click="navigateTo(subject)"
            >
            </v-list-item>
            <v-divider></v-divider>
        </div>
    </v-list>   
</template>

<script>
export default {
    name: "KnowledgeBase",
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