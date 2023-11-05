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
};
