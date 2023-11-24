<template>
  <div v-if="inspection">
    <!-- Show dialog with required tasks when inspection is started -->
    <inspection-form-intro
      v-if="inspection.completed === false"
      :address="address"
      :city="city"
      :required-tasks="inspection.requiredTasks"
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
      ref="inspectionFormTaskRef-damages"
      :title="'Schade'"
      :required-task="inspection.requiredTasks.includes('damages')"
      :task-items="inspection.damages"
      @add-form="addForm(inspection.damages, 'damages')"
    >
      <template v-slot="{ index }">
        <inspection-form-damages
          :inspection-id="inspection.id"
          :index="index"
          @submit-form="updateData(inspection.id, 'damages', inspection.damages)"
          @delete-form="deleteForm(index, inspection.id, 'damages', inspection.damages)" 
        />
      </template>
    </inspection-form-task>

    <!-- List of deferred maintenance -->
    <inspection-form-task
      ref="inspectionFormTaskRef-deferredMaintenance"
      :title="'Achterstallig onderhoud'"
      :required-task="inspection.requiredTasks.includes('deferredMaintenance')"
      :task-items="inspection.deferredMaintenance"
      @add-form="addForm(inspection.deferredMaintenance, 'deferredMaintenance')"
    >
      <template v-slot="{ index }">
        <inspection-form-deferred-maintenance
          :inspection-id="inspection.id"
          :index="index"
          @submit-form="updateData(inspection.id, 'deferredMaintenance', inspection.deferredMaintenance)"
          @delete-form="deleteForm(index, inspection.id, 'deferredMaintenance', inspection.deferredMaintenance)"
        />
      </template>
    </inspection-form-task>

    <!-- List of technical installations -->
    <inspection-form-task
      ref="inspectionFormTaskRef-technicalInstallations"
      :title="'Technische installaties'"
      :required-task="inspection.requiredTasks.includes('technicalInstallations')"
      :task-items="inspection.technicalInstallations"
      @add-form="addForm(inspection.technicalInstallations, 'technicalInstallations')"
    >
      <template v-slot="{ index }">
        <inspection-form-technical-installations
          :inspection-id="inspection.id"
          :index="index"
          @submit-form="updateData(inspection.id, 'technicalInstallations', inspection.technicalInstallations)"
          @delete-form="deleteForm(index, inspection.id, 'technicalInstallations', inspection.technicalInstallations)"
        />
      </template>
    </inspection-form-task>

    <!-- List of modifications -->
    <inspection-form-task
      ref="inspectionFormTaskRef-modifications"
      :title="'Modificaties'"
      :required-task="inspection.requiredTasks.includes('modifications')"
      :task-items="inspection.modifications"
      @add-form="addForm(inspection.modifications, 'modifications')"
    >
      <template v-slot="{ index }">
        <inspection-form-modifications
          :inspection-id="inspection.id"
          :index="index"
          :documentation="inspection.documentation"
          @submit-form="updateData(inspection.id, 'modifications', inspection.modifications)"
          @delete-form="deleteForm(index, inspection.id, 'modifications', inspection.modifications)" 
        />
      </template>
    </inspection-form-task>

    <!-- Confirmation dialog when deleting a form from the database -->
    <confirmation-dialog
      v-if="viewDialogDelete === true"
      @confirmed="handleConfirmDelete"
      @canceled="handleCancel"
    >
      <template #title>
        <p>Verwijder formulier?</p>
      </template>   
        <template #text>
          <p>Weet u zeker dat u dit formulier wilt verwijderen?</p>
        </template>  
    </confirmation-dialog>

    <!-- Button for finishing the inspection -->
    <v-container
      v-if="inspection.completed === false"
      class="text-center"
    >
      <v-btn
        class="mx-auto"
        prepend-icon="mdi-check-bold"
        color="secondary"
        @click="viewDialogComplete = true"
      >
        Voltooi inspectie
      </v-btn>
    </v-container>

    <!-- Confirmation dialog when completing inspection -->
    <confirmation-dialog
      v-if="viewDialogComplete === true"
      @confirmed="handleConfirmComplete"
      @canceled="handleCancel"
    >
      <template #title>
        <p>Inspectie voltooien?</p>
      </template>   
        <template #text>
          <p>Weet u zeker dat u de inspectie wilt voltooien?</p>
          <p>Let op: onopgeslagen wijzigingen gaan verloren.</p>
        </template>  
    </confirmation-dialog>
  </div>
</template>

<script>
import InspectionFormIntro from "@/components/InspectionFormIntro.vue";
import InspectionFormTask from "@/components/InspectionFormTask.vue";
import InspectionFormDamages from "@/components/InspectionFormDamages.vue";
import InspectionFormDeferredMaintenance from "@/components/InspectionFormDeferredMaintenance.vue";
import InspectionFormTechnicalInstallations from "@/components/InspectionFormTechnicalInstallations.vue";
import InspectionFormModifications from "@/components/InspectionFormModifications.vue";
import ConfirmationDialog from "./ConfirmationDialog.vue";

import inspectionService from "@/services/InspectionsService.js";
import FilesService from "@/services/FilesService.js";

export default {
  name: "InspectionForm",
  components: {
    InspectionFormIntro,
    InspectionFormTask,
    InspectionFormDamages,
    InspectionFormDeferredMaintenance,
    InspectionFormTechnicalInstallations,
    InspectionFormModifications,
    ConfirmationDialog
  },
  data() {
    return {
      currentIndexToDelete: null,
      currentIdToUpdate: '',
      currentTaskToUpdate: '',
      currentDataToUpdate: null,
      viewDialogDelete: false,
      viewDialogComplete: false,
    }
  },
  computed: {
    // Get requested inspection data
    inspection() {
      return this.$store.getters.getInspection(this.id);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.city = this.$route.params.city;
    this.address = this.$route.params.address;
  },
  methods: {
    // Add new form
    addForm(item, task) {
      item.push({}); // Add the new form
      // Open the new form
      const index = item.length - 1;
      const refName = `inspectionFormTaskRef-${task}`;
      if (this.$refs[refName]) {
        this.$refs[refName].openPanel(index);
      }
    },

    // Save new data to Firestore database
    async updateData(id, task, formData) {
      this.$store.dispatch('setLoading', true); // Start loading
      const newFormData = JSON.parse(JSON.stringify(formData));
      
      try {
        await inspectionService.updateInspection(id, task, newFormData); // Update the data
        // Close panels
        const refName = `inspectionFormTaskRef-${task}`;
        if (this.$refs[refName]) {
          this.$refs[refName].closeAllPanels();
        }

        this.$store.dispatch('setLoading', false); // Loading done
        this.$store.dispatch('showSnackbar', 'Data opgeslagen.'); // Show snackbar with confirmation 
      } catch (error) {
        this.$store.commit('SET_ERROR', "Er ging iets mis bij het updaten van de data. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
        this.$store.dispatch('setLoading', false); // Loading done
      }
    },

    // Delete form
    deleteForm(index, id, task, formData) {
      // If form is empty, delete it without asking for a confirmation
      if(Object.keys(formData[index]).length === 0) {
        formData.splice(index, 1);
        this.$store.dispatch('showSnackbar', 'Formulier verwijderd.'); // Show snackbar with confirmation 
      // If form is not empty, ask user for confirmation
      } else {
        // Save necessary data
        this.currentIndexToDelete = index;
        this.currentIdToUpdate = id;
        this.currentTaskToUpdate = task;
        this.currentDataToUpdate = formData;
        this.viewDialogDelete = true; // Show the confirmation dialog
      }
    },

    // Delete data after confirmation
    async handleConfirmDelete() {
      const photos = this.currentDataToUpdate[0].photos; // Get urls of uploaded photos
      // Delete photos from Firebase storage
      if (photos) {
        for (const photo of photos) {
          await FilesService.deletePhoto(photo);
        }
      }

      this.currentDataToUpdate.splice(this.currentIndexToDelete, 1) // Perform the delete operation
      await this.updateData(this.currentIdToUpdate, this.currentTaskToUpdate, this.currentDataToUpdate); // Update the data with the deleted form
      this.viewDialogDelete = false; // Close the confirmation dialog
      this.$store.dispatch('showSnackbar', 'Data verwijderd.'); // Show snackbar with confirmation 
    },

    // Complete inspection
    async handleConfirmComplete() {
      this.$store.dispatch('setLoading', true); // Start loading
      await new Promise(resolve => setTimeout(resolve, 1000)); // One second delay for a cleaner and more satisfying transition ;)
      try {
        this.viewDialogComplete = false;
        this.$router.push({ name: 'dashboard' }); // Send the user back to the dashboard
        await inspectionService.completeInspection(this.id); // Set the "completed" field of the inspection to true
        this.$store.dispatch('setLoading', false); // Loading done
        this.$store.dispatch('showSnackbar', 'Inspectie voltooid.'); // Show snackbar with confirmation
      } catch (error) {
        this.viewDialogComplete = false;
        this.$store.commit('SET_ERROR', "Er ging iets mis bij het voltooien van de inspectie. Probeer het later nog eens of neem contact op met de beheerder."); // Show error message
        this.$store.dispatch('setLoading', false); // Loading done
      }
    },

    handleCancel() {
      // Close the dialog
      this.viewDialogDelete = false;
      this.viewDialogComplete = false;
    },
  }
};
</script>
