<template>
    <div>
        <v-list 
        v-if="inspections.length"
        class="mt-5"
        lines="two"
        >
            <v-list-subheader class="mb-5 text-h5 text-primary">Toegewezen rapporten</v-list-subheader>
            <v-divider></v-divider>
            <div
                v-for="inspection in inspections"
                :key="inspection.id"
            >
                <v-list-item
                    class="pl-5"
                    :value="inspection.id"
                    :title="inspection.address + ', ' + inspection.city"
                    :subtitle="'Inspectiedatum: ' + inspection.dateOfInspection"
                >
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>

<script>
import apiClient from "../services/InspectionsService"

export default {
    data() {
        return {
            inspections: [],
        }
    },
    methods: {
        fetchInspections() {
            apiClient.fetchData()
                .then(inspectionsData => {
                    // Sorteren
                    inspectionsData.sort((a, b) => {
                        return new Date(b.dateOfInspection) - new Date(a.dateOfInspection);
                    });

                    this.inspections = inspectionsData;
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
        },
    },
    beforeMount() {
        this.fetchInspections()
    },
  };
</script>

<style>

</style>