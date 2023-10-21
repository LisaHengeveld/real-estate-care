import { Inspections, Damages, DeferredMaintenance, TechnicalInstallations, Modifications } from "../models/InspectionsModel.js";

const apiClient = {
    baseURL: 'https://my-json-server.typicode.com/LisaHengeveld/real-estate-care',

    async fetchData() {
        return fetch(`${this.baseURL}/db`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const inspectionsData = data.inspections.map(insp => {
                const damages = insp.damages.map(damage => new Damages(damage.location, damage.newDamage, damage.kind, damage.date, damage.urgent, damage.description));
                const deferredMaintenance = insp.deferredMaintenance.map(dm => new DeferredMaintenance(dm.location, dm.kind, dm.urgent, dm.costIndication));
                const technicalInstallations = insp.technicalInstallations.map(ti => new TechnicalInstallations(ti.location, ti.kind, ti.reportedMalfunctions, ti.testProcedure, ti.approved, ti.comments));
                const modifications = insp.modifications.map(mod => new Modifications(mod.documentedSituation, mod.location, mod.executedBy, mod.description, mod.action, mod.comments));

                return new Inspections(insp.id, insp.address, insp.city, insp.dateOfInspection, damages, deferredMaintenance, technicalInstallations, modifications);
            });

            return inspectionsData;
        });
    },
};

export default apiClient;