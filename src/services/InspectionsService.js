import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Inspections,
  Damages,
  DeferredMaintenance,
  TechnicalInstallations,
  Modifications,
} from "../models/InspectionsModel.js";

export default {
    // Url of web API JSON database
    baseURL: "https://my-json-server.typicode.com/LisaHengeveld/real-estate-care",

    async fetchData() {
        try {
            const querySnapshot = await getDocs(collection(db, "inspections"));
            let inspectionsData = [];
            querySnapshot.forEach((insp) => {
                // console.log(insp.id, " => ", insp.data());
                const damages = insp.data().damages.map(
                    (damage) =>
                    new Damages(
                        damage.location,
                        damage.newDamage,
                        damage.kind,
                        damage.date,
                        damage.urgent,
                        damage.description
                    )
                );
                const deferredMaintenance = insp.data().deferredMaintenance.map(
                    (dm) =>
                    new DeferredMaintenance(
                        dm.location,
                        dm.kind,
                        dm.urgent,
                        dm.costIndication
                    )
                );
                const technicalInstallations = insp.data().technicalInstallations.map(
                    (ti) =>
                    new TechnicalInstallations(
                        ti.location,
                        ti.kind,
                        ti.reportedMalfunctions,
                        ti.testProcedure,
                        ti.approved,
                        ti.comments
                    )
                );
                const modifications = insp.data().modifications.map(
                    (mod) =>
                    new Modifications(
                        mod.documentedSituation,
                        mod.location,
                        mod.executedBy,
                        mod.description,
                        mod.action,
                        mod.comments
                    )
                );

                inspectionsData.push(new Inspections(
                    insp.id,
                    insp.data().address,
                    insp.data().city,
                    insp.data().dateOfInspection,
                    insp.data().completed,
                    insp.data().requiredTasks,
                    damages,
                    deferredMaintenance,
                    technicalInstallations,
                    modifications
                ));

            });
            return inspectionsData;
        } catch (error) {
            console.error("Error retrieving data: ", error);
        }
    },

    // Update data on web API
    updateData(id, updatedData) {
        // return axios
        // .put(`${this.baseURL}/inspections/${id}`, updatedData)
        // .then(response => {
        //     console.log('Update response:', response.data);
        //     // return response.data;

        //     // Introduce a delay
        //     return new Promise(resolve => setTimeout(resolve, 5000));
        // }).then(() => {
        //     // Immediately fetch the record to see if the update "took place"
        //     return axios.get(`${this.baseURL}/inspections/${id}?` + new Date().getTime());
        // }).then(response => {
        //     // Log the fetched data to see the update
        //     console.log('Fetch Response', response.data);
        // })
    },
};
