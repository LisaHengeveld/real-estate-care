<template>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      :timeout="timeout"
      color="secondary"
      class="snackbar"
    >
      <!-- Get message from store -->
      {{ $store.state.snackbar.text }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="$store.commit('HIDE_SNACKBAR')"
        >
          Sluiten
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
    name: "SnackbarMessage",
    data: () => ({
      timeout: 3000, // Show message for 3 seconds
    }),
  }
</script>

<style scoped>
    .snackbar {
        bottom: 56px;
    }
</style>