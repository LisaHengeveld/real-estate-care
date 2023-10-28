<template>
    <form class="pt-2" @submit.prevent="submit">
        <v-text-field
        :model-value="damage.location"
        color="primary"
        label="Locatie"
        variant="outlined"
        ></v-text-field>

        <v-radio-group
        :model-value="damage.newDamage"
        color="primary"
        inline
        >
        <template v-slot:label>
            <div>Nieuwe schade</div>
        </template>
        <v-radio
            label="Ja"
            value="Ja"
        ></v-radio>
        <v-radio
            label="Nee"
            value="Nee"
        ></v-radio>
        </v-radio-group>

        <v-select
        :model-value="damage.kind"
        color="primary"
        label="Soort schade"
        :items="['Moedwillig', 'Slijtage', 'Geweld', 'Normaal gebruik', 'Calamiteit', 'Anders']"
        variant="outlined"
        ></v-select>

        <v-text-field
            :model-value="damage.date"
            color="primary"
            label="Datum"
            type="date"
            variant="outlined"
        ></v-text-field>

        <v-radio-group
        :model-value="damage.urgent"
        color="primary"
        inline
        >
        <template v-slot:label>
            <div>Accute actie vereist</div>
        </template>
        <v-radio
            label="Ja"
            value="Ja"
        ></v-radio>
        <v-radio
            label="Nee"
            value="Nee"
        ></v-radio>
        </v-radio-group>

        <v-textarea
            :model-value="damage.description"
            color="primary"
            label="Omschrijving"
            variant="outlined"
        ></v-textarea>

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
    props: [
        'damage'
    ]
}
</script>

<style>

</style>