<template>
    <div>
        <!-- Header -->
        <div class="inspection-header">
            <span>{{ title }}</span>
            <v-spacer></v-spacer>

            <!-- Show exclamation mark icon if this task is required -->
            <v-icon
                v-if="requiredTask"
                class="mx-2"
                icon="mdi-alert-octagon"
                color="white"
            ></v-icon>

            <!-- Button for adding new form -->
            <v-btn
                @click="addForm(taskItems)"
                icon="mdi-plus"
                size="compact"
                variant="text"
            ></v-btn>
        </div>

        <!-- Container for expansion panels -->
        <v-expansion-panels v-model="panel" variant="accordion">
            <v-expansion-panel
                v-for="(item, index) in taskItems"
                justify="space-between"
                :key="index"
                :value="index"
            >
                <!-- Item -->
                <v-expansion-panel-title>
                    <!-- Show location and kind as title if available. Otherwise show 'Voer in...' -->
                    <div v-if="item.location && item.kind">{{ item.location }} - {{ item.kind }}</div>
                    <div v-else-if="item.location && !('kind' in item)">{{ item.location }}</div>
                    <div v-else class="text-grey-lighten-1">Voer in...</div>
                    <v-spacer></v-spacer>

                    <!-- Show chip when immediate action is required -->
                    <v-chip
                        v-if="item.urgent === 'Ja'"
                        class="mr-5"
                        density="compact"
                        color="red"
                        text-color="white"
                    >
                        acute actie
                    </v-chip>
                </v-expansion-panel-title>

                <!-- Form with data if available -->
                <v-expansion-panel-text>
                    <!-- Specific form -->
                    <slot :index="index"></slot>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>
        
    </div>
</template>

<script>
export default {
    data() {
      return {
        panel: null,
      }
    },
    props: [
        'title',
        'requiredTask',
        'taskItems'
    ],
    methods: {
        addForm() {
            // Notify parent component to add new form
            this.$emit('add-form');
        },
        closeAllPanels() {
            this.panel = null;
        }
    }
}
</script>

<style scoped>
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