<template>
    <!-- Buttons for main functions -->
    <v-container class="dashboard-btns fill-height" fluid>
        <v-row justify="center">
            <v-btn
                v-for="item in items"
                :key="item.value"
                :text="item.text"
                @click="navigateTo(item.value)"
                class="ma-3"
                color="primary"
                height="150"
                width="150"
                rounded="xl"
                stacked
            >
                <template v-slot:prepend>
                    <v-icon size="60">
                        {{ item.icon }}
                    </v-icon>
                </template>
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "DashboardButtons",
    data() {
        return {
            // Four main functions
            items: [
                {
                value: 0,
                text: "Toegewezen inspecties",
                icon: "mdi-home-search"
                },
                {
                value: 1,
                text: "Uitgevoerde inspecties",
                icon: "mdi-home-edit"
                },
                {
                value: 2,
                text: "Kennisbase",
                icon: "mdi-lightbulb",
                },
                {
                value: 3,
                text: "Instellingen",
                icon: "mdi-cog",
                }
            ]
        }
    },
    methods: {
        // Navigation for the buttons for main functions
        navigateTo(itemValue) {
            switch(itemValue) {
                case 0:
                    this.$router.push({
                        name: 'inspectierapporten',
                        params: {
                            type: "toegewezen"
                        }
                    });
                    break;
                case 1:
                    this.$router.push({
                        name: 'inspectierapporten',
                        params: {
                            type: "uitgevoerd"
                        }
                    });
                    break;
                case 2:
                    this.$router.push('/kennisbase');
                    break;
                case 3:
                    this.$router.push('/instellingen');
                    break;
            }
        }
    }
}
</script>

<style scoped>
    .dashboard-btns {
        max-width: 400px;
    }
</style>