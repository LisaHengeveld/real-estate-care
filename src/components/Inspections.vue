<template>
    <div>
        <v-list 
        class="mt-5"
        lines="two"
        >
            <v-list-subheader class="mb-5 text-h5 text-primary">Toegewezen rapporten</v-list-subheader>
            <v-divider></v-divider>
            <div
                v-for="item in items"
                :key="item.id"
            >
                <v-list-item
                    class="pl-5"
                    :value="item.id"
                    :title="item.address + ', ' + item.city"
                    :subtitle="'Inspectiedatum: ' + item.dateOfInspection"
                >
                </v-list-item>
                <v-divider></v-divider>
            </div>
        </v-list>
    </div>
</template>

<script>
export default {
    data: () => ({
      items: [
    {
        "id": 0,
        "address": "Bredeweg 14",
        "city": "Amsterdam",
        "dateOfInspection": "2023-10-10",
        "damage": [
            {
                "location": "keuken",
                "new": "ja",
                "kind": "slijtage",
                "date": "2023-10-10",
                "urgent": "ja",
                "description": "De kraan in de keuken lekt en moet onmiddellijk worden gerepareerd."
            },
            {
                "location": "badkamer",
                "new": "ja",
                "kind": "slijtage",
                "date": "2023-10-10",
                "urgent": "nee",
                "description": "Tegels in de badkamer vertonen tekenen van slijtage en moeten worden vervangen."
            }
        ],
        "deferredMaintenance": [],
        "technicalInstallations": [
            {
                "location": "bovenverdieping",
                "kind": "verwarming",
                "reportedMalfunctions": "Verwarming slaat niet meer aan",
                "testProcedure": "",
                "approved": "ja",
                "comments": ""
            }
        ],
        "modifications": []
    },
    {
        "id": 1,
        "address": "Wilhelminastraat 25",
        "city": "Den Haag",
        "dateOfInspection": "2023-10-16",
        "damage": [],
        "deferredMaintenance": [
            {
                "location": "woonkamer",
                "kind": "schilderwerk",
                "urgent": "nee",
                "costIndication": "0-500"
            }
        ],
        "technicalInstallations": [],
        "modifications": []
    },
    {
        "id": 2,
        "address": "Singel 28",
        "city": "Amsterdam",
        "dateOfInspection": "2023-10-13",
        "damage": [
            {
                "location": "badkamer",
                "new": "ja",
                "kind": "slijtage",
                "date": "2023-10-04",
                "urgent": "ja",
                "description": "De douchekop in de badkamer lekt en moet worden vervangen."
            }
        ],
        "deferredMaintenance": [],
        "technicalInstallations": [],
        "modifications": [
            {
                "documentedSituation": "",
                "location": "woonkamer",
                "executedBy": "huurder",
                "description": "Vloerbedekking in de woonkamer geïnstalleerd.",
                "action": "laten verwijderen",
                "comments": ""
            }
        ]
    },
    {
        "id": 3,
        "address": "Molenstraat 2",
        "city": "Rotterdam",
        "dateOfInspection": "2023-10-04",
        "damage": [
            {
                "location": "woonkamer",
                "new": "ja",
                "kind": "slijtage",
                "date": "2023-10-09",
                "urgent": "nee",
                "description": "Er is een kleine barst in de muur van de woonkamer die herstel vereist."
            }
        ],
        "deferredMaintenance": [
            {
                "location": "woonkamer",
                "kind": "schilderwerk",
                "urgent": "nee",
                "costIndication": "0-500"
            },
            {
                "location": "keuken",
                "kind": "elektra",
                "urgent": "ja",
                "costIndication": "500-1000"
            },
            {
                "location": "hal",
                "kind": "schilderwerk",
                "urgent": "nee",
                "costIndication": "0-500"
            }
        ],
        "technicalInstallations": [
            {
                "location": "balkon slaapkamer",
                "kind": "beveiliging",
                "reportedMalfunctions": "Slot van balkondeur is verroest",
                "testProcedure": "",
                "approved": "nee",
                "comments": ""
            }
        ],
        "modifications": [
            {
                "documentedSituation": "",
                "location": "benedenverdieping",
                "executedBy": "huurder",
                "description": "Laminaat geïnstalleerd.",
                "action": "laten aanpassen en keuren",
                "comments": ""
            }
        ]
    },
    {
        "id": 4,
        "address": "Dorpsstraat 8",
        "city": "Utrecht",
        "dateOfInspection": "2023-10-08",
        "damage": [],
        "deferredMaintenance": [
            {
                "location": "hoofdslaapkamer",
                "kind": "schilderwerk",
                "urgent": "nee",
                "costIndication": "0-500"
            },
            {
                "location": "begane grond",
                "kind": "beglazing",
                "urgent": "nee",
                "costIndication": "1500+"
            }
        ],
        "technicalInstallations": [],
        "modifications": [
            {
                "documentedSituation": "",
                "location": "ramen buitenzijde",
                "executedBy": "huurder",
                "description": "Solar screens geplaatst",
                "action": "accepted",
                "comments": ""
            },
            {
                "documentedSituation": "",
                "location": "keuken",
                "executedBy": "aannemer",
                "description": "Nieuwe keukenapparatuur geïnstalleerd",
                "action": "accepteren",
                "comments": ""
            }
        ]
    }   
],
    }),
  }
</script>

<style>

</style>