<template>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      :timeout="timeout"
      color="secondary"
      class="snackbar"
    >
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
    data: () => ({
      timeout: 3000,
    }),
  }
</script>

<style scoped>
    .snackbar {
        bottom: 56px;
    }
</style>