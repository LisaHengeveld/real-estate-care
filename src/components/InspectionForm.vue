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
      @add-form="addForm(inspection.damages)"
    >
      <template v-slot="{ index }">
        <inspection-form-damages
          :inspectionId="inspection.id"
          :index="index"
          @submit-form="submitForm()"
          @delete-form="deleteForm(inspection.damages, index)" 
        />
      </template>
    </inspection-form-task>

    <!-- List of deferred maintenance -->
    <inspection-form-task
      :title="'Achterstallig onderhoud'"
      :requiredTask="inspection.requiredTasks.includes('deferredMaintenance')"
      :taskItems="inspection.deferredMaintenance"
      @add-form="addForm(inspection.deferredMaintenance)"
    >
      <template v-slot="{ index }">
        <inspection-form-deferred-maintenance
          :inspectionId="inspection.id"
          :index="index"
          @delete-form="deleteForm(inspection.deferredMaintenance, index)"
        />
      </template>
    </inspection-form-task>

    <!-- List of technical installations -->
    <inspection-form-task
      :title="'Technische installaties'"
      :requiredTask="inspection.requiredTasks.includes('technicalInstallations')"
      :taskItems="inspection.technicalInstallations"
      @add-form="addForm(inspection.technicalInstallations)"
    >
      <template v-slot="{ index }">
        <inspection-form-technical-installations
          :inspectionId="inspection.id"
          :index="index"
          @delete-form="deleteForm(inspection.technicalInstallations, index)"
        />
      </template>
    </inspection-form-task>

    <!-- List of modifications -->
    <inspection-form-task
      :title="'Modificaties'"
      :requiredTask="inspection.requiredTasks.includes('modifications')"
      :taskItems="inspection.modifications"
      @add-form="addForm(inspection.modifications)"
    >
      <template v-slot="{ index }">
        <inspection-form-modifications
          :inspectionId="inspection.id"
          :index="index"
          @delete-form="deleteForm(inspection.modifications, index)" 
        />
      </template>
    </inspection-form-task>

    <!-- Confirmation dialog when deleting a form from the database -->
    <inspection-form-confirmation-dialog
      v-if="viewDialog === true"
      @confirmed="handleConfirm"
      @canceled="handleCancel"
    />

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
import InspectionFormConfirmationDialog from "./InspectionFormConfirmationDialog.vue";

export default {
  data() {
    return {
      viewDialog: false,
      currentItemToDelete: null,
      currentIndexToDelete: null
    }
  },
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
    InspectionFormConfirmationDialog
  },
  computed: {
    // Get requested inspection data
    inspection() {
      return this.$store.getters.getInspection(this.id);
    },
  },
  methods: {
    addForm(item) {
      item.push({});
    },
    submitForm() {
      const id = this.inspection.id;
      const updatedData = this.inspection;
      this.$store.dispatch('updateInspectionData', { id, updatedData });
    },
    deleteForm(item, index) {
      if(Object.keys(item[index]).length === 0) {
        item.splice(index, 1);
      } else {
        // Store the current item and index to be deleted after confirmation
        this.currentItemToDelete = item;
        this.currentIndexToDelete = index;
        this.viewDialog = true; // Show the confirmation dialog
      } 
    },
    handleConfirm() {
      // Perform the delete operation
      // if (this.currentItemToDelete && this.currentIndexToDelete != null) {
      //   this.currentItemToDelete.splice(this.currentIndexToDelete, 1);
      // }
      console.log('Confirm delete');
      this.viewDialog = false; // Close the confirmation dialog
    },
    handleCancel() {
      // Close the dialog without deleting anything
      console.log('Cancel delete');
      this.viewDialog = false;
    }
  }
};
</script>
