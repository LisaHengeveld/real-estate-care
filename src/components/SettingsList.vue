<template>
    <div>
        <v-list
            class="mt-10 no-surface-color"
            lines="two"
        >
            <v-list-subheader class="mb-5 text-h5 text-primary">
                Instellingen
            </v-list-subheader>
            <v-divider></v-divider>

            <!-- List the setting options -->
            <div
                v-for="(item, index) in items"
                :key="index"
            >
                <v-list-item
                    :title="item.title"
                    :subtitle="item.subtitle"
                    :prepend-icon="item.icon"
                    class="pl-5"
                    @click="navigateTo(item.navigateTo)"
                >
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>

<script>
export default {
    name: "SettingsList",
    methods: {
        navigateTo(subject) {
            this.$router.push(`instellingen/${subject}`);
        }
    },
    data() {
        return {
            items: [
                {
                    title: "Account",
                    subtitle: "Wijzig e-mailadres",
                    icon: "mdi-account-edit",
                    navigateTo: "wijzig-email"
                },
                {
                    title: "Avatar",
                    subtitle: "Toevoegen/wijzigen profielfoto",
                    icon: "mdi-emoticon",
                    navigateTo: "wijzig-profielfoto"
                },
                {
                    title: "Wachtwoord",
                    subtitle: "Wijzig wachtwoord",
                    icon: "mdi-lock",
                    navigateTo: "wijzig-wachtwoord"
                },
                {
                    title: "Thema",
                    subtitle: "Licht/donker",
                    icon: "mdi-theme-light-dark",
                    navigateTo: "thema"
                },
                {
                    title: "Reset Database",
                    subtitle: "Herstel database naar oorspronkelijke staat",
                    icon: "mdi-database-refresh",
                    navigateTo: "herstel-database"
                },
            ],
        }
    },
}
</script>