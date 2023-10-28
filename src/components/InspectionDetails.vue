<template>
    <div>
        <div class="mx-4 mt-9 pt-4 text-h5 text-primary">{{ address }}, {{ city }}</div>
        <div class="ml-4 mb-6 text-subtitle-1 text-primary">Inspectiedatum: {{ inspection.dateOfInspection }}</div>

        <!-- List of damages -->
        <div class="inspection-header">
            <span>Schade</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>
        <v-expansion-panels variant="accordion">
            <v-expansion-panel
                v-for="(damage, index) in inspection.damages"
                justify="space-between"
                :key="index"
                :value="index"
            >
                <v-expansion-panel-title>
                    <div>{{ damage.location }} - {{ damage.kind }}</div>
                    <v-spacer></v-spacer>
                    <v-chip
                    v-if="damage.urgent === 'ja'"
                    class="mr-5"
                    density="compact"
                    color="red"
                    text-color="white"
                    >
                        acute actie
                    </v-chip>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <form-damages :damage="damage" />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>

        <!-- List of deferred maintances -->
        <div class="inspection-header">
            <span>Achterstallig onderhoud</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>
        <v-expansion-panels variant="accordion">
            <v-expansion-panel
                v-for="(maintenance, index) in inspection.deferredMaintenance"
                justify="space-between"
                :key="index"
                :value="index"
            >
                <v-expansion-panel-title>
                    <div>{{ maintenance.location }} - {{ maintenance.kind }}</div>
                    <v-spacer></v-spacer>
                    <v-chip
                    v-if="maintenance.urgent === 'ja'"
                    class="mr-5"
                    density="compact"
                    color="red"
                    text-color="white"
                    >
                        acute actie
                    </v-chip>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <form-damages />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>

        <!-- List of technical installations -->
        <div class="inspection-header">
            <span>Technische installaties</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>

        <v-expansion-panels variant="accordion">
            <v-expansion-panel
                v-for="(installation, index) in inspection.technicalInstallations"
                justify="space-between"
                :key="index"
                :value="index"
            >
                <v-expansion-panel-title>
                    <div>{{ installation.location }} - {{ installation.kind }}</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <form-damages />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>

        <!-- List of modifications -->
        <div class="inspection-header">
            <span>Modificaties</span>
            <v-btn class="ml-auto" icon="mdi-plus" size="compact" variant="plain"></v-btn>
        </div>

        <v-expansion-panels>
            <v-expansion-panel
                v-for="(modification, index) in inspection.modifications"
                justify="space-between"
                :key="index"
                :value="index"
            >
                <v-expansion-panel-title>
                    <div>{{ modification.location }} - {{ modification.kind }}</div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <form-damages />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

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
    },
    computed: {
        inspection() {
            // Get requested inspection data
            return this.$store.getters.getInspection(this.id);
        }
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

    .v-expansion-panels {
        z-index: auto;
    }
</style>