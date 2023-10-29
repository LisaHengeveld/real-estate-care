<template>
    <v-form class="pt-2" @submit.prevent="submitForm">
        <v-text-field
        v-model="formData.location"
        color="primary"
        label="Locatie"
        variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="formData.newDamage"
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
        v-model="formData.kind"
        color="primary"
        label="Soort schade"
        :items="['Moedwillig', 'Slijtage', 'Geweld', 'Normaal gebruik', 'Calamiteit', 'Anders']"
        variant="outlined"
        ></v-select>

        <v-text-field
            v-model="formData.date"
            color="primary"
            label="Datum"
            type="date"
            variant="outlined"
        ></v-text-field>

        <v-radio-group
        v-model="formData.urgent"
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
            v-model="formData.description"
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
    data() {
        return {
            formData: this.damage
        }
    },
    props: [
        'damage'
    ],
    methods: {
    submitForm() {
      // Emit an event with the updated data to notify the parent
      this.$emit('updateData', this.formData);
    },
    emits: ['updateData']
  },
}
</script>

<style>

</style>