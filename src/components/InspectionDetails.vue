<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">{{ address }}, {{ city }}</div>
        <!-- <div class="ml-4 mb-6 text-subtitle-1 text-primary">Inspectiedatum: {{ inspection.dateOfInspection }}</div> -->

        <div class="inspection-header">
            <span>Schade</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>
        <v-expansion-panels variant="accordion">
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
            :value="i"
            title="Schade"
        >
            <v-expansion-panel-text>
                <form-damages />
            </v-expansion-panel-text>
        </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>

        <div class="inspection-header">
            <span>Achterstallig onderhoud</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>
        <v-expansion-panels variant="accordion">
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
            title="Item"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>

        <div class="inspection-header">
            <span>Technische installaties</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>

        <v-divider></v-divider>

        <div class="inspection-header">
            <span>Modificaties</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>

        <v-divider></v-divider>
    </div>
</template>

<script>
import FormDamages from "@/components/FormDamages.vue"

export default {
    created() {
        this.id = this.$route.params.id;
        this.city = this.$route.params.city;
        this.address = this.$route.params.address;
    },
    components: {
        FormDamages
    }
}
</script>

<style>
    .inspection-header {
        display: flex;
        color: white;
        background-color: rgb(var(--v-theme-primary));
        padding: 14px 20px;
        font-size: large;
        font-weight: bold;
    }

    .v-expansion-panels{
        z-index: auto;
    }
</style>