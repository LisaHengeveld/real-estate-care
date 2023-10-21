class Inspections {
    constructor(id, address, city, dateOfInspections, damages, deferredMaintenance, technicalInstallations, Modifications) {
        this.id = id;
        this.address = address;
        this.dateOfInspections = dateOfInspections;
        this.damages = damages || [];
        this.deferredMaintenance = deferredMaintenance || [];
        this.technicalInstallations = technicalInstallations || [];
        this.Modifications = Modifications || [];
    }
}

class Damages {
    constructor(location, newDamage, kind, date, urgent, description) {
        this.location = location;
        this.newDamage = newDamage;
        this.kind = kind;
        this.date = date;
        this.urgent = urgent;
        this.description = description;
    }
}

class DeferredMaintenance {
    constructor(location, kind, urgent, costIndication) {
        this.location = location;
        this.kind = kind;
        this.urgent = urgent;
        this.costIndication = costIndication;
    }
}

class TechnicalInstallations {
    constructor(location, kind, reportedMalfunctions, testProcedure, approved, comments) {
        this.location = location;
        this.kind = kind;
        this.reportedMalfunctions = reportedMalfunctions;
        this.testProcedure = testProcedure;
        this.approved = approved;
        this.comments = comments;
    }
}

class Modifications {
    constructor(documentedSituation, location, executedBy, description, action, comments) {
        this.documentedSituation = documentedSituation;
        this.location = location;
        this.executedBy = executedBy;
        this.description = description;
        this.action = action;
        this.comments = comments;
    }
}