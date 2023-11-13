<template>
    <v-form class="pt-2" ref="formModificationsRef" @submit.prevent="submitForm">
    
      <!-- Textfield for link to docs on current state and modifications -->
      <v-text-field
        v-model="modification.documentedSituation"
        color="primary"
        label="Documenten huidige staat / modificaties"
        hint="www.example.com/page"
        variant="outlined"
      ></v-text-field>
  
      <!-- Textfield for location modification -->
      <v-text-field
        class="mt-2"
        v-model="modification.location"
        color="primary"
        label="Locatie aangetroffen modificatie"
        variant="outlined"
        :rules="[rules.required]"
      ></v-text-field>
  
      <!-- Select field for kind of modification -->
      <v-select
        class="mt-2"
        v-model="modification.executedBy"
        color="primary"
        label="Uitgevoerd door"
        :items="[
          'Huurder',
          'Aannemer',
          'Onbekend'
        ]"
        variant="outlined"
        :rules="[rules.required]"
      ></v-select>
  
      <!-- Text area for description of modification -->
      <v-textarea
        class="mt-2"
        v-model="modification.description"
        color="primary"
        label="Omschrijving"
        variant="outlined"
        :rules="[rules.required]"
      ></v-textarea>

      <!-- Select field for action to be taken -->
      <v-select
        class="mt-2"
        v-model="modification.action"
        color="primary"
        label="Te ondernemen actie"
        :items="[
          'Accepteren',
          'Laten keuren',
          'Laten verwijderen',
          'Laten aanpassen en keuren'
        ]"
        variant="outlined"
        :rules="[rules.required]"
      ></v-select>

      <!-- Text area for comments -->
      <v-textarea
        class="mt-2"
        v-model="modification.comments"
        color="primary"
        label="Opmerkingen"
        variant="outlined"
      ></v-textarea>
  
      <!-- Submit button -->
      <v-btn
          class="mt-3 me-4"
          type="submit"
          color="primary"
      > 
          Opslaan
      </v-btn>

      <!-- Delete form button -->
      <v-btn
          class="mt-3 me-4"
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
        formValid: null
      },
    }),
    props: ["inspectionId", "index"],
    methods: {
      async submitForm() {
        // Validate the form
        this.formValid = await this.$refs.formModificationsRef.validate();
        // If the form is valid, proceed with submission
        if (this.formValid.valid) {
          // Emit an event to notify the parent component to save this form.
          this.$emit('submit-form');
        }
      },
      deleteForm() {
        // Emit an event to notify the parent component to delete this form.
        this.$emit('delete-form');
      }
    },
    computed: {
    // Get data
    modification() {
      return this.$store.getters.getModification(this.inspectionId, this.index);
    },
  },
  };
  </script>
  
  <style></style>
  