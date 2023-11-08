<template>
    <v-form class="pt-2" @submit.prevent="submitForm">
  
      <!-- Textfield for location maintenance -->
      <v-text-field
        v-model="maintenance.location"
        color="primary"
        label="Locatie"
        variant="outlined"
        :rules="[rules.required]"
      ></v-text-field>
  
      <!-- Select field for kind of maintenance -->
      <v-select
        v-model="maintenance.kind"
        color="primary"
        label="Soort onderhoud"
        :items="[
          'Schilderwerk',
          'Houtrot',
          'Elektra',
          'Leidingwerk',
          'Beglazing',
        ]"
        variant="outlined"
        :rules="[rules.required]"
      ></v-select>
  
      <!-- Radio group yes/no if acute action is required -->
      <v-radio-group
        v-model="maintenance.urgent"
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
  
      <!-- Select field for cost indication -->
      <v-select
        v-model="maintenance.costIndication"
        color="primary"
        label="Kostenindicatie"
        :items="[
          '0-500',
          '500-1.500',
          '1.500+',
        ]"
        variant="outlined"
        :rules="[rules.required]"
      ></v-select>
  
      <!-- Submit button -->
      <v-btn
          class="me-4"
          type="submit"
          color="primary"
      > 
          Opslaan
      </v-btn>

      <!-- Delete form button -->
      <v-btn
          class="me-4"
          color="red-darken-3"
          width="110px"
          @click="deleteForm()"
      > 
          Verwijder
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
    props: ["inspectionId", "index"],
    methods: {
      submitForm() {
        // To be implemented
      },
      deleteForm() {
        // Emit an event to notify the parent component to delete this form.
        this.$emit('delete-form');
      }
    },
    computed: {
      // Get data
      maintenance() {
        return this.$store.getters.getDeferredMaintenance(this.inspectionId, this.index);
      },
    },
  };
  </script>
  
  <style></style>
  