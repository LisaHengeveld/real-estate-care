import axios from "axios";
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

    // Fetch data from web API
    fetchData() {
        return axios
        .get(`${this.baseURL}/inspections`)
        .then((response) => response.data)
        .then((data) => {
            // Format data to correct structure
            const inspectionsData = data.map((insp) => {
            const damages = insp.damages.map(
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
            const deferredMaintenance = insp.deferredMaintenance.map(
                (dm) =>
                new DeferredMaintenance(
                    dm.location,
                    dm.kind,
                    dm.urgent,
                    dm.costIndication
                )
            );
            const technicalInstallations = insp.technicalInstallations.map(
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
            const modifications = insp.modifications.map(
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

            return new Inspections(
                insp.id,
                insp.address,
                insp.city,
                insp.dateOfInspection,
                insp.completed,
                insp.requiredTasks,
                damages,
                deferredMaintenance,
                technicalInstallations,
                modifications
            );
            });
            
            return inspectionsData;
        });
    },

    // Update data on web API
    updateData(id, updatedData) {
        return axios
        .put(`${this.baseURL}/inspections/${id}`, updatedData)
        .then(response => {
            console.log('Update response:', response.data);
            // return response.data;

            // Introduce a delay
            return new Promise(resolve => setTimeout(resolve, 5000));
        }).then(() => {
            // Immediately fetch the record to see if the update "took place"
            return axios.get(`${this.baseURL}/inspections/${id}?` + new Date().getTime());
        }).then(response => {
            // Log the fetched data to see the update
            console.log('Fetch Response', response.data);
        })
    },
};
