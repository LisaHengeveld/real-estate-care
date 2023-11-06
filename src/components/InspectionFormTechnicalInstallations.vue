<template>
    <v-form class="pt-2" @submit.prevent="submitForm">
  
      <!-- Textfield for location installation -->
      <v-text-field
        v-model="installation.location"
        color="primary"
        label="Locatie"
        variant="outlined"
        :rules="[rules.required]"
      ></v-text-field>
  
      <!-- Select field for kind of installation -->
      <v-select
        v-model="installation.kind"
        color="primary"
        label="Soort installatie"
        :items="[
          'Koeling',
          'Verwarming',
          'Luchtverversing',
          'Elektra',
          'Beveiliging',
        ]"
        variant="outlined"
        :rules="[rules.required]"
      ></v-select>
  
      <!-- Textfield for reported malfunctions -->
      <v-text-field
        v-model="installation.reportedMalfunctions"
        color="primary"
        label="Gemelde storingen"
        variant="outlined"
      ></v-text-field>

      <!-- Textfield for link to pdf-file of test procedure -->
      <v-text-field
        v-model="installation.testProcedure"
        color="primary"
        label="Testprocedure"
        hint="www.example.com/page"
        variant="outlined"
        :rules="[rules.required]"
      ></v-text-field>
  
      <!-- Radio group yes/no if installation is approved -->
      <v-radio-group
        v-model="installation.approved"
        color="primary"
        inline
        :rules="[rules.required]"
      >
        <template v-slot:label>
          <div>Goedgekeurd</div>
        </template>
        <v-radio label="Ja" value="Ja"></v-radio>
        <v-radio label="Nee" value="Nee"></v-radio>
      </v-radio-group>
  
      <!-- Text area for comments -->
      <v-textarea
        v-model="installation.comments"
        color="primary"
        label="Opmerkingen"
        variant="outlined"
      ></v-textarea>
  
      <!-- Submit button -->
      <v-btn
          class="me-4"
          type="submit"
          color="primary"
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
    props: ["installation"], // Data of relevant damage
    methods: {
      submitForm() {
        // To be implemented
      },
    },
  };
  </script>
  
  <style></style>
  