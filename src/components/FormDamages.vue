<template>
    <v-form class="pt-2" @submit.prevent="submitForm">
        <v-text-field
        v-model="damage.location"
        color="primary"
        label="Locatie"
        variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="damage.newDamage"
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
        v-model="damage.kind"
        color="primary"
        label="Soort schade"
        :items="['Moedwillig', 'Slijtage', 'Geweld', 'Normaal gebruik', 'Calamiteit', 'Anders']"
        variant="outlined"
        ></v-select>

        <v-text-field
            v-model="damage.date"
            color="primary"
            label="Datum"
            type="date"
            variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="damage.urgent"
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
            v-model="damage.description"
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
    </v-form>
</template>

<script>
export default {
    // Wordt ook gelijk aangepast in oudercomponent???
    props: [
        'damage'
    ],
    methods: {
        submitForm() {
        // Emit an event with the updated data to notify the parent
        this.$emit('updateData', this.formData);
        },
    },
    emits: ['updateData']
}
</script>

<style>

</style>