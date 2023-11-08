<template>
    <v-dialog
      v-model="viewDialog"
      width="auto"
    >
        <v-card>
            <v-card-title>
                Verwijder formulier?
            </v-card-title>
            <v-card-text>
                Weet u zeker dat u dit formulier wilt verwijderen?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="confirm">Ja</v-btn>
                <v-btn color="error" @click="cancel">Nee</v-btn>
            </v-card-actions>
        </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
      return {
        viewDialog: true,
      }
    },
  methods: {
    confirm() {
      this.$emit('confirmed', true); // Emit an event to the parent component
    },
    cancel() {
      this.$emit('canceled', false); // Emit an event to the parent component
    },
  },
};
</script>