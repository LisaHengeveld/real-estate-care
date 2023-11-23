<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card class="intro-inspection">
        <v-toolbar
          class="px-2"
          color="primary"
          title="Start inspectie"
        ></v-toolbar>
        <v-card-text>
          <p>
            U gaat nu beginnen aan de inspectie bij:<br />
            <strong>{{ address }} in {{ city }}</strong>
          </p>
          <p>
            Het doel van deze inspectie is:<br />
            <strong>{{ translatedTasks }}</strong>
          </p>
          <p>
            Indien nodig kunnen extra onderdelen worden toegevoegd via de
            plustekens aan de rechterkant.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialog"
          >
            Sluiten
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: "InspectionFormIntro",
  props: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    requiredTasks: {
      type: Array,
      required: true,
      validator: function (value) {
        const allowedCategories = ['damages', 'deferredMaintenance', 'technicalInstallations', 'modifications'];
        return value.every(item => allowedCategories.includes(item));
      }
    }
  },
  data() {
    return {
      dialog: true,
    };
  },
  computed: {
    // Get translated array of required tasks
    translatedTasks() {
      const translatedTasks = this.requiredTasks.map((task) => {
        switch (task) {
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
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  },
}
</script>

<style>
  .intro-inspection p {
    margin-block-end: 10px;
  }   
</style>