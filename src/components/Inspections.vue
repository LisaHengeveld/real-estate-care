<template>
    <div>
        <v-list 
        v-if="inspections.length"
        class="mt-10"
        lines="two"
        >
            <v-list-subheader class="mb-5 text-h5 text-primary">Uitgevoerde inspecties</v-list-subheader>
            <v-divider></v-divider>
            <div
                v-for="inspection in inspections"
                :key="inspection.id"
            >
                <v-list-item
                    class="pl-5"
                    :value="inspection.id"
                    :title="inspection.address + ', ' + inspection.city"
                    :subtitle="'Inspectiedatum: ' + inspection.dateOfInspection"
                    @click="navigateTo(inspection)"
                >
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>

<script>
export default {
    methods: {
        navigateTo(inspection) {
            this.$router.push({
                name: 'inspectiedetails',
                params: {
                    id: inspection.id,
                    city: inspection.city,
                    address: inspection.address
                }
            });
        }
    },
    computed: {
        inspections() {
            return this.$store.state.inspections
        }
    }
  };
</script>

<style>

</style>