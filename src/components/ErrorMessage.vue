<template>
    <v-snackbar
      v-model="$store.state.errorMessage.show"
      :timeout="timeout"
      color="error"
      class="snackbar"
      vertical
    >
      {{ $store.state.errorMessage.text }}

      <template v-slot:actions>
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
    data: () => ({
      timeout: 10000,
    }),
  }
</script>

<style scoped>
    .snackbar {
        bottom: 56px;
    }
</style>