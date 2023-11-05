<template>
  <v-form class="pt-2" @submit.prevent="submitForm" disabled>

    <!-- Textfield for location damage -->
    <v-text-field
      v-model="damage.location"
      color="primary"
      label="Locatie"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <!-- Radio group yes/no for new damage -->
    <v-radio-group
      v-model="damage.newDamage"
      color="primary"
      inline
      :rules="[rules.required]"
    >
      <template v-slot:label>
        <div>Nieuwe schade</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Select field for kind of damage -->
    <v-select
      v-model="damage.kind"
      color="primary"
      label="Soort schade"
      :items="[
        'Moedwillig',
        'Slijtage',
        'Geweld',
        'Normaal gebruik',
        'Calamiteit',
        'Anders',
      ]"
      variant="outlined"
      :rules="[rules.required]"
    ></v-select>

    <!-- Text field for date of registering damage -->
    <v-text-field
      v-model="damage.date"
      color="primary"
      label="Datum"
      type="date"
      variant="outlined"
      :rules="[rules.required]"
    ></v-text-field>

    <!-- Radio group yes/no if acute action is required -->
    <v-radio-group
      v-model="damage.urgent"
      color="primary"
      inline
      :rules="[rules.required]"
    >
      <template v-slot:label>
        <div>Accute actie vereist</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Text area for description of damage -->
    <v-textarea
      v-model="damage.description"
      color="primary"
      label="Omschrijving"
      variant="outlined"
      :rules="[rules.required]"
    ></v-textarea>

    <!-- Submit button -->
    <v-btn
        class="me-4"
        type="submit"
        color="primary"
        disabled
    > 
        Opslaan
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: value => !!value || 'Veld is verplicht',
    },
  }),
  props: ["damage"], // Data of relevant damage
  methods: {
    submitForm() {
      // To be implemented
    },
  },
};
</script>

<style></style>