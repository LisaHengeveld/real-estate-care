<template>
  <div v-if="inspection">
    <!-- Show dialog with required tasks when inspection is started -->
    <v-dialog
      v-if="inspection.completed === false"
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>
          Start inspectie
        </v-card-title>
        <v-card-text>
          <p>U gaat nu beginnen aan de inspectie aan de {{ address }} te {{ city }}.</p>
          <p>Het doel van deze inspectie is: <span class="text-primary">{{ requiredTasks }}</span></p>
          <p>Let op: Het is altijd mogelijk om extra onderdelen toe te voegen via het plusteken aan de rechterkant.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDialog">Sluiten</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
    <div class="inspection-header">
      <span>Schade</span>
      <v-spacer></v-spacer>

      <!-- Show chip if checking for damages is a required task in this inspection -->
      <v-icon
        v-if="inspection.requiredTasks.includes('damages')"
        class="mx-2"
        icon="mdi-alert-octagon"
        color="white"
      ></v-icon>

      <!-- Button for adding new damage (yet to be implemented) -->
      <v-btn
        icon="mdi-plus"
        size="compact"
        variant="plain"
      ></v-btn>
    </div>
    
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(damage, index) in inspection.damages"
        justify="space-between"
        :key="index"
        :value="index"
      >
        
        <!-- Damage item -->
        <v-expansion-panel-title>
          <div>{{ damage.location }} - {{ damage.kind }}</div>
          <v-spacer></v-spacer>
          <v-chip
            v-if="damage.urgent === 'Ja'"
            class="mr-5"
            density="compact"
            color="red"
            text-color="white"
          >
            acute actie
          </v-chip>
        </v-expansion-panel-title>

        <!-- Form with details -->
        <v-expansion-panel-text>
          <inspection-form-damages :damage="damage" /> <!-- Send relevent data to form -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <!-- List of deferred maintenances -->
    <div class="inspection-header">
      <span>Achterstallig onderhoud</span>
      <v-spacer></v-spacer>

      <!-- Show exclamation mark if checking for deferred maintences is a required task in this inspection -->
      <v-icon
        v-if="inspection.requiredTasks.includes('deferredMaintenance')"
        class="mx-2"
        icon="mdi-alert-octagon"
        color="white"
      ></v-icon>

      <!-- Button for adding new maintenance (yet to be implemented) -->
      <v-btn
        class="ml-auto"
        icon="mdi-plus"
        size="compact"
        variant="plain"
      ></v-btn>
    </div>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(maintenance, index) in inspection.deferredMaintenance"
        justify="space-between"
        :key="index"
        :value="index"
      >

        <!-- Deferred maintenance item -->
        <v-expansion-panel-title>
          <div>{{ maintenance.location }} - {{ maintenance.kind }}</div>
          <v-spacer></v-spacer>
          <v-chip
            v-if="maintenance.urgent === 'Ja'"
            class="mr-5"
            density="compact"
            color="red"
            text-color="white"
          >
            acute actie
          </v-chip>
        </v-expansion-panel-title>

        <!-- Form with details -->
        <v-expansion-panel-text>
          <inspection-form-maintenances :maintenance="maintenance"/> <!-- Send relevent data to form -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <!-- List of technical installations -->
    <div class="inspection-header">
      <span>Technische installaties</span>
      <v-spacer></v-spacer>

      <!-- Show exclamation mark if the checkup for technical installations is a required task in this inspection -->
      <v-icon
        v-if="inspection.requiredTasks.includes('technicalInstallations')"
        class="mx-2"
        icon="mdi-alert-octagon"
        color="white"
      ></v-icon>

      <!-- Button for adding new installation (yet to be implemented) -->
      <v-btn
        class="ml-auto"
        icon="mdi-plus"
        size="compact"
        variant="plain"
      ></v-btn>
    </div>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="(installation, index) in inspection.technicalInstallations"
        justify="space-between"
        :key="index"
        :value="index"
      >

        <!-- Technical installation item -->
        <v-expansion-panel-title>
          <div>{{ installation.location }} - {{ installation.kind }}</div>
        </v-expansion-panel-title>

        <!-- Form with details -->
        <v-expansion-panel-text>
          <inspection-form-technical-installations :installation="installation"/> <!-- Send relevent data to form -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <!-- List of modifications -->
    <div class="inspection-header">
      <span>Modificaties</span>
      <v-spacer></v-spacer>

      <!-- Show exclamation mark if checking for modifications is a required task in this inspection -->
      <v-icon
        v-if="inspection.requiredTasks.includes('modifications')"
        class="mx-2"
        icon="mdi-alert-octagon"
        color="white"
      ></v-icon>

      <!-- Button for adding new modification (yet to be implemented) -->
      <v-btn
        class="ml-auto"
        icon="mdi-plus"
        size="compact"
        variant="plain"
      ></v-btn>
    </div>

    <v-expansion-panels>
      <v-expansion-panel
        v-for="(modification, index) in inspection.modifications"
        justify="space-between"
        :key="index"
        :value="index"
      >

        <!-- Modification item -->
        <v-expansion-panel-title>
          <div>{{ modification.location }}</div>
        </v-expansion-panel-title>

        <!-- Form with details -->
        <v-expansion-panel-text>
          <inspection-form-modifications :modification="modification" /> <!-- Send relevent data to form -->
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>
  </div>
</template>

<script>
import InspectionFormDamages from "@/components/InspectionFormDamages.vue";
import InspectionFormMaintenances from "@/components/InspectionFormDeferredMaintenances.vue";
import InspectionFormTechnicalInstallations from "@/components/InspectionFormTechnicalInstallations.vue";
import InspectionFormModifications from "@/components/InspectionFormModifications.vue";

export default {
  data() {
    return {
      dialog: false,
    }
  },
  mounted() {
    // Show dialog with required tasks when inspection is started
    this.dialog = true;
  },
  created() {
    this.id = this.$route.params.id;
    this.city = this.$route.params.city;
    this.address = this.$route.params.address;
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
  components: {
    InspectionFormDamages,
    InspectionFormMaintenances,
    InspectionFormTechnicalInstallations,
    InspectionFormModifications
  },
  computed: {
    // Get requested inspection data
    inspection() {
      return this.$store.getters.getInspection(this.id);
    },

    // Get translated array of required tasks
    requiredTasks() {
      const translatedTasks = this.inspection.requiredTasks.map(task => {
        switch(task) {
          case "damages":
            task = "schade opnemen";
            break;
          case "deferredMaintenance":
            task = "controleren op achterstallig onderhoud";
            break;
          case "technicalInstallations":
            task = "technische installaties keuren";
            break;
          case "modifications":
            task = "controleren op modificaties";
        }
        return task;
      });

      return translatedTasks.join(", ");
    }
  },
};
</script>

<style>
.inspection-header {
  display: flex;
  color: white;
  background-color: rgb(var(--v-theme-primary));
  padding: 14px 20px;
  font-size: large;
  font-weight: bold;
}

.v-expansion-panels {
  z-index: auto;
}
</style>