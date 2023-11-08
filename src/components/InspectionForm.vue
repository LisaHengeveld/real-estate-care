<template>
  <div v-if="inspection">
    <!-- Show dialog with required tasks when inspection is started -->
    <inspection-form-intro
      v-if="inspection.completed === false"
      :address="address"
      :city="city"
      :requiredTasks="inspection.requiredTasks"
    />

    <!-- Title -->
    <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
      {{ address }}, {{ city }}
    </div>
    <div
      v-if="inspection.completed === false"
      class="ml-4 mb-6 text-subtitle-1 text-primary"
    >
      Geplande inspectiedatum: {{ inspection.dateOfInspection }}
    </div>
    <div
      v-if="inspection.completed === true"
      class="ml-4 mb-6 text-subtitle-1 text-primary"
    >
      Inspectiedatum: {{ inspection.dateOfInspection }}
    </div>

    <!-- List of damages -->
    <inspection-form-task
      :title="'Schade'"
      :requiredTask="inspection.requiredTasks.includes('damages')"
      :taskItems="inspection.damages"
    >
      <template v-slot="{ index }">
        <inspection-form-damages
        :inspectionId="inspection.id"
        :index="index" />
      </template>
    </inspection-form-task>

    <!-- List of deferred maintenance -->
    <inspection-form-task
      :title="'Achterstallig onderhoud'"
      :requiredTask="inspection.requiredTasks.includes('deferredMaintenance')"
      :taskItems="inspection.deferredMaintenance"
    >
      <template v-slot="{ index }">
        <inspection-form-deferred-maintenance
        :inspectionId="inspection.id"
        :index="index" />
      </template>
    </inspection-form-task>

    <!-- List of technical installations -->
    <inspection-form-task
      :title="'Technische installaties'"
      :requiredTask="inspection.requiredTasks.includes('technicalInstallations')"
      :taskItems="inspection.technicalInstallations"
    >
      <template v-slot="{ index }">
        <inspection-form-technical-installations
        :inspectionId="inspection.id"
        :index="index" />
      </template>
    </inspection-form-task>

    <!-- List of modifications -->
    <inspection-form-task
      :title="'Modificaties'"
      :requiredTask="inspection.requiredTasks.includes('modifications')"
      :taskItems="inspection.modifications"
    >
      <template v-slot="{ index }">
        <inspection-form-modifications
        :inspectionId="inspection.id"
        :index="index" />
      </template>
    </inspection-form-task>

    <!-- Button for finishing the inspection -->
    <v-container
    v-if="inspection.completed === false"
    class="text-center"
    >
      <v-btn
      class="mx-auto"
        prepend-icon="mdi-check-bold"
        color="secondary"
      >
        Voltooi inspectie
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import InspectionFormIntro from "@/components/InspectionFormIntro.vue";
import InspectionFormTask from "@/components/InspectionFormTask.vue";
import InspectionFormDamages from "@/components/InspectionFormDamages.vue";
import InspectionFormDeferredMaintenance from "@/components/InspectionFormDeferredMaintenance.vue";
import InspectionFormTechnicalInstallations from "@/components/InspectionFormTechnicalInstallations.vue";
import InspectionFormModifications from "@/components/InspectionFormModifications.vue";

export default {
  created() {
    this.id = this.$route.params.id;
    this.city = this.$route.params.city;
    this.address = this.$route.params.address;
  },
  components: {
    InspectionFormIntro,
    InspectionFormTask,
    InspectionFormDamages,
    InspectionFormDeferredMaintenance,
    InspectionFormTechnicalInstallations,
    InspectionFormModifications,
  },
  computed: {
    // Get requested inspection data
    inspection() {
      return this.$store.getters.getInspection(this.id);
    },
  },
};
</script>
