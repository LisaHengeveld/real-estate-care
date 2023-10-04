<template>
    <v-container class="dashboard-btns fill-height">
        <v-row justify="center">
            <v-btn
                v-for="item in items"
                :key="item.value"
                :text="item.text"
                class="ma-3"
                color="#00aaa2"
                min-height="150"
                min-width="150"
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
                text: "Toegewezen",
                icon: "mdi-clipboard-text",
                },
                {
                value: 1,
                text: "Uitgevoerd",
                icon: "mdi-clipboard-check",
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
    }
}
</script>

<style scoped>
    .dashboard-btns {
        max-width: 400px;
    }
</style>