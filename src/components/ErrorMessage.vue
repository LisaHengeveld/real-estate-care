<template>
    <v-snackbar
      v-model="$store.state.errorMessage.show"
      :timeout="timeout"
      class="snackbar"
      color="error"
      vertical
    >
      <!-- Get error message from store -->
      {{ $store.state.errorMessage.text }}

      <template #actions>
        <v-btn
          color="white"
          variant="text"
          @click="$store.commit('HIDE_ERROR')"
        >
          Sluiten
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
  export default {
    name: "ErrorMessage",
    data: () => ({
      timeout: 10000, // Show message 10 sec
    }),
  }
</script>

<style scoped>
    .snackbar {
        bottom: 56px;
    }
</style>