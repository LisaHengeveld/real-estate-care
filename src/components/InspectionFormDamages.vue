<template>
  <v-form
    ref="formDamagesRef"
    class="pt-2"
    @submit.prevent="submitForm"
  >

    <!-- Textfield for location damage -->
    <v-text-field
      v-model="damage.location"
      :rules="[rules.required]"
      color="primary"
      label="Locatie*"
      variant="outlined"
    ></v-text-field>

    <!-- Radio group yes/no for new damage -->
    <v-radio-group
      v-model="damage.newDamage"
      :rules="[rules.required]"
      color="primary"
      inline
    >
      <template v-slot:label>
        <div>Nieuwe schade*</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Select field for kind of damage -->
    <v-select
      v-model="damage.kind"
      label="Soort schade*"
      :items="[
        'Moedwillig',
        'Slijtage',
        'Geweld',
        'Normaal gebruik',
        'Calamiteit',
        'Anders',
      ]"
      :rules="[rules.required]"
      color="primary"
      variant="outlined"
    >
      <!-- Hide counter by passing an empty counter slot -->
      <template #counter></template>
    </v-select>

    <!-- Text field for date of registering damage -->
    <v-text-field
      v-model="damage.date"
      :rules="[rules.required]"
      class="mt-2"
      color="primary"
      label="Datum*"
      type="date"
      variant="outlined"
    ></v-text-field>

    <!-- Radio group yes/no if acute action is required -->
    <v-radio-group
      v-model="damage.urgent"
      :rules="[rules.required]"
      color="primary"
      inline
    >
      <template #label>
        <div>Accute actie vereist*</div>
      </template>
      <v-radio label="Ja" value="Ja"></v-radio>
      <v-radio label="Nee" value="Nee"></v-radio>
    </v-radio-group>

    <!-- Text area for description of damage -->
    <v-textarea
      v-model="damage.description"
      :rules="[rules.required]"
      color="primary"
      label="Omschrijving*"
      variant="outlined"
    ></v-textarea>

    <!-- Field for uploading photos -->
    <inspection-form-photo-upload
      ref="photoUpload"
      :inspection-id="this.inspectionId"
      :task="'Damages'"
      :uploaded-photos="typeof damage.photos !== 'undefined' ? damage.photos : []" 
    />

    <!-- Submit button -->
    <v-btn
        class="mt-3 me-4"
        type="submit"
        color="primary"
        width="110px"
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
import InspectionFormPhotoUpload from "@/components/InspectionFormPhotoUpload.vue";

export default {
  name: "InspectionFormDamages",
  components: {
    InspectionFormPhotoUpload
  },
  props: {
    inspectionId: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true,
      validator: function (value) {
        return Number.isInteger(value) && value >= 0;
      }
    }
  },
  data: () => ({
    rules: {
      required: value => !!value || 'Veld is verplicht',
    },
    formValid: null
  }),
  computed: {
    // Get data
    damage() {
      return this.$store.getters.getDamage(this.inspectionId, this.index);
    },
  },
  methods: {
    async submitForm() {
      // Validate the form
      this.formValid = await this.$refs.formDamagesRef.validate();
      // If the form is valid, proceed with submission
      if (this.formValid.valid) {
        // Upload photos
        this.damage.photos = await this.$refs.photoUpload.uploadPhotos();

        // Emit an event to notify the parent component to save this form.
        this.$emit('submit-form');
      }
    },
    
    deleteForm() {
      // Emit an event to notify the parent component to delete this form.
      this.$emit('delete-form');
    }
  },
};
</script>