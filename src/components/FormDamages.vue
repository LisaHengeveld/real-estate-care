<template>
    <form class="pt-2" @submit.prevent="submit">
        <v-text-field
        v-model="location"
        color="primary"
        label="Locatie"
        variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="newDamage"
        color="primary"
        inline
        >
        <template v-slot:label>
            <div>Nieuwe schade</div>
        </template>
        <v-radio
            label="Ja"
            value="ja"
        ></v-radio>
        <v-radio
            label="Nee"
            value="nee"
        ></v-radio>
        </v-radio-group>

        <v-select
        v-model="kind"
        color="primary"
        label="Soort schade"
        :items="['Moedwillig', 'Slijtage', 'Geweld', 'Normaal gebruik', 'Calamiteit', 'Anders']"
        variant="outlined"
        ></v-select>

        <v-text-field
            v-model="date"
            color="primary"
            label="Datum"
            type="date"
            variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="urgent"
        color="primary"
        inline
        >
        <template v-slot:label>
            <div>Accute actie vereist</div>
        </template>
        <v-radio
            label="Ja"
            value="ja"
        ></v-radio>
        <v-radio
            label="Nee"
            value="nee"
        ></v-radio>
        </v-radio-group>

        <v-text-field
            v-model="description"
            color="primary"
            label="Omschrijving"
            variant="outlined"
        ></v-text-field>

        <v-btn
        class="me-4"
        type="submit"
        color="primary"
        >
        opslaan
        </v-btn>
    </form>
</template>

<script>
import apiClient from "../services/InspectionsService"

export default {
    data() {
        return {
            inspection: {},
            
            location: null,
            description: null,
            newDamage: null,
            kind: null,
            date: null,
            urgent: null
        }
    },
    methods: {
        fetchInspection() {
            apiClient.fetchData()
                .then(inspectionsData => {
                    this.inspection = inspectionsData.find(obj => obj.id === +this.id);
                })
                .catch(error => {
                    console.error("Error: ", error);
                });
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.city = this.$route.params.city;
        this.address = this.$route.params.address;

        this.fetchInspection();
    },
}
</script>

<style>

</style>