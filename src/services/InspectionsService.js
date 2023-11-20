import { collection, onSnapshot, doc, updateDoc, getDocs, writeBatch } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Inspections,
  Damages,
  DeferredMaintenance,
  TechnicalInstallations,
  Modifications,
} from "../models/InspectionsModel.js";

export default {
    // Fetch data of all inspections
    fetchData(callback, onError) {
        const unsubscribe = onSnapshot(collection(db, "inspections"), (querySnapshot) => {
            const inspectionsData = [];
            // Set data in right format
            querySnapshot.forEach((insp) => {
                const damages = insp.data().damages.map(
                    (damage) =>
                    new Damages(
                        damage.location,
                        damage.newDamage,
                        damage.kind,
                        damage.date,
                        damage.urgent,
                        damage.description,
                        damage.photos
                    )
                );
                const deferredMaintenance = insp.data().deferredMaintenance.map(
                    (dm) =>
                    new DeferredMaintenance(
                        dm.location,
                        dm.kind,
                        dm.urgent,
                        dm.costIndication,
                        dm.photos
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
                        ti.comments,
                        ti.photos
                    )
                );
                const modifications = insp.data().modifications.map(
                    (mod) =>
                    new Modifications(
                        mod.location,
                        mod.executedBy,
                        mod.description,
                        mod.action,
                        mod.comments,
                        mod.photos
                    )
                );

                inspectionsData.push(new Inspections(
                    insp.id,
                    insp.data().address,
                    insp.data().city,
                    insp.data().documentation,
                    insp.data().dateOfInspection,
                    insp.data().completed,
                    insp.data().requiredTasks,
                    damages,
                    deferredMaintenance,
                    technicalInstallations,
                    modifications
                ));
            });
            callback(inspectionsData);
        }, 
        (error) => {
            onError(error);
        });
        return unsubscribe;
    },

    // Update data in an inspection
    async updateInspection(id, task, formData) {
        const inspectionRef = doc(db, "inspections", id);

        // Update given task with new data
        await updateDoc(inspectionRef, {
            [task]: formData
        })
    },

    // Complete an inspection
    async completeInspection(id) {
        const inspectionRef = doc(db, "inspections", id);
        const dateToday = new Date().toISOString().slice(0, 10);

        // To be sure, update inspection date to today
        // Set the "completed" field of the inspection to true
        await updateDoc(inspectionRef, {
            dateOfInspection: dateToday,
            completed: true
        });	
    },

    // Reset database to original state
    async resetDatabase(jsonData) {
        // Delete existing documents
        const querySnapshot = await getDocs(collection(db, "inspections"));
        const batch = writeBatch(db);
        
        querySnapshot.forEach((documentSnapshot) => {
            batch.delete(documentSnapshot.ref);
        });

        await batch.commit(); // Commit the deletion

        // Upload new data
        const newBatch = writeBatch(db);
        jsonData.inspections.forEach((inspectionData) => {
            const newDocRef = doc(collection(db, "inspections"));
            newBatch.set(newDocRef, inspectionData);
        });

        await newBatch.commit(); // Commit the new data
    }
};
