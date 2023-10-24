<template>
    <v-container class="dashboard-btns fill-height">
        <v-row justify="center">
            <v-btn
                v-for="item in items"
                :key="item.value"
                :text="item.text"
                @click="navigateTo(item.value)"
                class="ma-3"
                color="#00aaa2"
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
            // Vier hoofdfuncties
            items: [
                {
                value: 0,
                text: "Toegewezen inspecties",
                // icon: "mdi-clipboard-text",
                icon: "mdi-home-search"
                },
                {
                value: 1,
                text: "Uitgevoerde inspecties",
                icon: "mdi-clipboard-check",
                // icon: "mdi-home-edit"
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
        navigateTo(itemValue) {
            if (itemValue === 1) {
                this.$router.push('/inspectierapporten');
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