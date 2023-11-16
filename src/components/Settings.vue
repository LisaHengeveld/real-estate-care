<template>
    <v-list
        class="mt-10"
        lines="two"
    >
        <v-list-subheader class="mb-5 text-h5 text-primary">
            Instellingen
        </v-list-subheader>
        <v-divider></v-divider>

        <!-- List the subjects of the knowledge base -->
        <div
            v-for="(item, index) in items"
            :key="index"
        >
            <v-list-item
                class="pl-5"
                :title="item.title"
                :subtitle="item.subtitle"
                :prepend-icon="item.icon"
                @click="navigateTo(item)"
            >
            </v-list-item>
            <v-divider></v-divider>
        </div>
    </v-list>   
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    title: "Account",
                    subtitle: "Wijzig gegevens",
                    icon: "mdi-account-edit"
                },
                {
                    title: "Avatar",
                    subtitle: "Toevoegen/wijzigen profielfoto",
                    icon: "mdi-emoticon"
                },
                {
                    title: "Wachtwoord",
                    subtitle: "Wijzig wachtwoord",
                    icon: "mdi-lock"
                },
                {
                    title: "Thema",
                    subtitle: "Licht/donker",
                    icon: "mdi-theme-light-dark"
                },
                {
                    title: "Reset Database",
                    subtitle: "Herstel database naar oorspronkelijke staat",
                    icon: "mdi-database-refresh"
                },
            ],
        }
    },
    methods: {
        navigateTo(subject) {
            this.$router.push(`instellingen/${subject}`);
        }
    }
}
</script>