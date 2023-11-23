<template>
    <div class="fill-height">
        <!-- List of all inspections -->
        <v-list 
            v-if="inspections.length"
            class="mt-10 no-surface-color"
            lines="two"
        >
            <v-list-subheader
                :title="(type === 'toegewezen' ? 'Toegewezen inspecties' : 'Uitgevoerde inspecties')"
                class="mb-5 text-h5 text-primary"
            ></v-list-subheader>
            <v-divider></v-divider>
            <div
                v-for="inspection in inspections"
                :key="inspection.id"
            >
                <v-list-item
                    :value="inspection.id"
                    :title="inspection.address + ', ' + inspection.city"
                    :subtitle="(type === 'toegewezen' ? 'Geplande inspectiedatum: ' : 'Inspectiedatum: ') + inspection.dateOfInspection"
                    append-icon="mdi-chevron-right"
                    class="pl-5"
                    @click="navigateTo(inspection)"
                >
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>

        <!-- Fallback for when there are no inspections to be listed -->
        <v-container
            v-else
            class="no-inspections fill-height"
            fluid
        >
            <v-row
                justify="center"
                align="center"
                class="fill-height"
            >
                <div class="text-center">
                    <v-icon
                        color="primary"
                        size="80"
                    >
                        mdi-home-search
                    </v-icon>
                    <div class="text-h5 text-primary">Geen beschikbare inspecties</div>
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "InspectionsList",
    computed: {
        // Get data of inspections
        inspections() {
            if (this.type === "toegewezen") {
                const assignedInspections = this.$store.getters.getAssignedInspections;

                // Sort by date (ascending)
                assignedInspections.sort((a, b) => {
                    return new Date(a.dateOfInspection) - new Date(b.dateOfInspection);
                });

                return assignedInspections;
            } else if (this.type === "uitgevoerd") {
                const completedInspections = this.$store.getters.getCompletedInspections;

                // Sort by date (descending)
                completedInspections.sort((a, b) => {
                    return new Date(b.dateOfInspection) - new Date(a.dateOfInspection);
                });

                return this.$store.getters.getCompletedInspections;
            }
        },
    },
    created() {
        this.type = this.$route.params.type;
    },
    methods: {
        // Navigate to details of relevant inspection
        navigateTo(inspection) {
            this.$router.push({
                name: 'inspectieformulier',

                // Send params for browser link (id is needed to determine inspection)
                params: {
                    id: inspection.id,
                    city: inspection.city,
                    address: inspection.address
                }
            });
        }
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 80px);
  }

  .no-inspections {
    /* position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); */
    opacity: 0.5;
  }
</style>