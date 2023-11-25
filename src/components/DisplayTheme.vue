<template>
  <div>
    <div class="mx-4 mt-9 pt-4 text-h5 text-primary">
      Instellingen display thema
    </div>
    <div class="ma-4">
      <v-switch
        v-model="isDarkTheme"
        hide-details
        @change="toggleTheme"
      >
        <template #label>
          <div>
            <!-- Show available option to switch to -->
            <v-icon>{{ isDarkTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
            {{ isDarkTheme ? 'Omschakelen naar licht thema' : 'Omschakelen naar donker thema' }}
          </div>
        </template>
      </v-switch>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  // Define a key for localStorage
  const THEME_KEY = 'user-theme-preference';

  // Computed property to determine if the current theme is dark
  const isDarkTheme = ref(theme.global.current.value.dark);

  // Watcher to save theme preference to localStorage whenever it changes
  watchEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkTheme.value ? 'realEstateCareDarkTheme' : 'realEstateCareLightTheme');
  });

  // Switch theme to light/dark
  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'realEstateCareLightTheme' : 'realEstateCareDarkTheme'
  }
</script>