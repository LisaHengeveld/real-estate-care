# Real Estate Care
Deze mobiele webapplicatie is gemaakt in het kader van de eindopdracht voor de module Front-end Frameworks van de opleiding Front-end Development bij de LOI. Deze opdracht is gegeven vanuit de fictieve dienstverlenende organisatie Real Estate Care. Deze organisatie zorgt voor het onderhoud, verbeteren en inspecteren van woningen voor diverse opdrachtgevers. De applicatie, ontwikkeld voor zowel iOS als Android, is gericht op het maximaliseren van de efficiëntie van inspecteurs op locatie. De kernfunctionaliteiten van de applicatie omvatten het onmiddellijk verwerken van inspectiegegevens, het in real-time toevoegen van fotomateriaal aan rapportages en het bieden van toegang tot relevante documentatie.

## Installatie

### Kloon de repository:
```
git clone https://github.com/LisaHengeveld/real-estate-care
```

### Navigeer naar de gekloonde repository:
```
cd real-estate-care
```

### Installeer de vereiste packages:
```
npm install
```

### Start de server:
```
npm run serve
```
## Live versie
Via onderstaande link kan een live versie van de mobiele webapplicatie bekeken worden.\
https://link.com (volgt nog...)

## Werking van de app
### Inloggen
Er zijn op dit moment twee accounts beschikbaar, waarmee kan worden ingelogd in de applicatie:
|E-mailadres                    |Wachtwoord      |
|-------------------------------|----------------|
|johndoe@real-estate-care.nl    |JDoe@REC        |
|janedoe@real-estate-care.nl    |JDoe@REC        |

Na het opgeven van het e-mailadres en wachtwoord wordt gevraagd naar de 2FA-code. Deze is te vinden in de 'Local Storage' van de browser.

### Hoofdfuncties
Na het inloggen kom je direct terecht bij het dashboard. Hierin zijn de vier hoofdfuncties verwerkt:
1. **Toegewezen inspecties:** Onder deze knop zijn de toegewezen inspecties te vinden. Wanneer een inspectie wordt geopend, wordt van tevoren aangegeven welke van de vier onderdelen (schade opnemen, achterstallig onderhoud opnemen, technische installaties inspecteren en modificaties inventariseren) bij deze inspectie verplicht zijn. Dit is tevens te zien aan de iconen met een uitroepteken bij de betreffende onderdelen in de rapportage. Bij ieder onderdeel kunnen extra formulieren worden toegevoegd via de plustekens aan de rechterkant. Nieuw ingevoerde data en wijzigingen worden opgeslagen wanneer op de knop 'opslaan' wordt geklikt in het betreffende formulier. Via de knop 'voltooi inspectie' kan het rapport worden afgerond, welke vervolgens bij 'uitgevoerde inspecties' komt te staan.
2. **Uitgevoerde inspecties:** Onder deze knop zijn de rapportages van de uitgevoerde inspecties te vinden. Deze hebben dezelfde opbouw en functionaliteiten als de toegewezen inspecties. Echter staat hier al data in welke te bewerken is. Ook hier zijn wijzigingen pas definitief, wanneer op 'opslaan' wordt geklikt bij het betreffende formulier.
3. **Kennisbase:** De kennisbase geeft toegang tot alle relevante bestanden voor de inspecties, zoals testprocedures en documentatie van woningen. Hierin kunnen onder andere huidige situaties en modificaties worden teruggevonden. In dit prototype zijn hiervoor dummybestanden gebruikt. In de rapportages worden bij de onderdelen 'technische installaties inspecteren' en 'modificaties inventariseren' gelinkt naar deze bestanden.
4. **Instellingen:** Bij de instellingen kunnen accountgegevens worden aangepast, kan het display thema naar licht of donker worden ingesteld en kan de database worden gereset. Deze laatste optie is alleen bedoeld voor het testen van dit prototype en zal geen optie zijn in een definitieve versie van deze applicatie voor Real Estate Care. Het herstellen van de data wordt hieronder verder beschreven.

Onder de knop 'informatie' in de navigatiebalk onderaan kan de gebruiker informatie vinden over de werking van de applicatie.

### Resetten database
Voor het testen van de applicatie is een optie ingebouwd om de data te herstellen. De originele JSON-data wordt weer opnieuw ingeladen (dit overschrijft de huidige data), geüploade foto's en de profielfoto worden verwijderd. De originele data bevat twee toegewezen inspecties en drie uitgevoerde inspecties. Voor het testen van de applicatie is het aan te raden de database te resetten, zodat alle functionaliteiten getest kunnen worden.\
**Let op:** Het resetten van de database zet aangepaste wachtwoorden *niet* terug naar hun origineel. Mocht het wachtwoord tijdens het testen zijn gewijzigd, graag deze na afloop weer terugzetten zodat de vermelde inloggegevens functioneel blijven.

## Beschrijving ontwikkelproces
De ontwikkeling van de mobiele webapplicatie voor Real Estate Care was een gefaseerd proces, bestaande uit onderzoek naar de benodigde nieuwe technieken, de toepassing van deze technieken en uiteindelijk een hoop troubleshooting.

**Fase 1: Framework bepalen**\
In deze initiële fase is veel onderzoek gedaan op het internet naar verschillende frameworks. Voor het kiezen van een geschikt framework die wordt gebruikt voor deze case is voornamelijk gekeken naar de documentatie die ervoor beschikbaar is, de ondersteunende community, het ecosysteem, de veiligheid en of het geheel aansluit op de eisen van de case. De keuze is gevallen op Vue.js. Een volledige beschrijving en onderbouwing van deze keuze is te vinden in de debriefing die is ingeleverd met deze opdracht.\
Voor het ontwikkelen van de Vue.js applicatie is Vue CLI (Command Line Interface) geïnstalleerd door middel van `npm install -g @vue/cli`. Dit commando vereist dat Node.js is geïnstalleerd, wat reeds het geval was. Voor de ontwikkelomgeving is Visual Studio Code gebruikt. Ook deze was voorafgaand aan deze module al geïnstalleerd.

**Fase 2: Visuele opzet van het dashboard**\
De eerste ontwikkeling van de applicatie betrof het dashboard met de vier hoofdfuncties, zoals beschreven in de case, inclusief header en tab bar onderaan. Het uitwerken van de functionaliteiten van de knoppen was pas later van toepassing. Het ging nu alleen om de UI. Hiervoor werd gebruik gemaakt van Vuetify, een Material Design componentenbibliotheek voor Vue.js die helpt bij het bouwen van responsieve en stijlvolle webapplicaties. Om onder andere hiermee te leren werken is een cursus gevolgd op Udemy van Danny Connell. Deze cursus bood ook ondersteuning bij onderdelen die later van toepassing waren bij het ontwikkelen van de app.

**Fase 3: Database opstellen en inladen**\
Het volgende onderdeel was het opstellen van een JSON-database met dummydata, deze inladen in de app en weergeven bij de uitgevoerde inspecties. Voor de web API is MyJSON Server gebruikt. Dit is een fake online REST server die dient voor het testen en prototypen van frontendprojecten. MyJSON Server is zeer makkelijk te gebruiken en pastte op dit moment goed bij wat nodig was voor het inladen en weergeven van de data.

**Fase 4: CRUD-operaties bewerkstelligen**\
Toen de CRUD-operaties moesten worden toegevoegd, kwamen al snel de beperkingen van MyJSON Server naar boven. Naast dat de dataset maximaal 10KB mag zijn, wat erg snel werd bereikt, werden wijzigingen die gemaakt worden via CRUD-operaties niet permanent opgeslagen; ze zijn tijdelijk en worden gewist na een reset, die elke minuut plaatsvindt. Om deze reden is verder gekeken naar andere web API's. Uiteindelijk is gekozen voor Firebase van Google. Firebase omvat onder andere de Firestore die cloud-gehoste databases biedt die realtime data synchronisatie mogelijk maakt tussen gebruikers en apparaten. Iets wat een vereiste was voor deze applicatie. Daarnaast biedt Firebase ook een storage voor file uploads/downloads en authenticatie, wat beide later nodig is voor de app. Tenslotte biedt Firebase een veilige en robuuste service. Dit wordt verder besproken bij 'security'.\
De data wordt opgehaald via een service en vervolgens gecentraliseerd in de state. Voor het beheren van de state is gebruik gemaakt van Vuex; een state management bibliotheek voor Vue.js applicaties. Ook in de verdere ontwikkeling van de applicatie worden alle interacties met Firebase gedaan via een service. Hierdoor hebben wijzigingen in de backend-service minimaal invloed op de componenten zelf, wat de onderhoudbaarheid van de applicatie ten goede komt. Alle error-handling wordt opgevangen in de betreffende componenten, zodat er gerichte feedback gegeven kan worden aan de gebruiker.

**Fase 5: Files uploaden en inladen**\
Voor het ophalen van de pdf-bestanden in de kennisbase en het uploaden en weergeven van foto's bij de rapportages is gebruik gemaakt van de Firebase Storage. Hierin kan gebruikerscontent zoals bestanden en afbeeldingen veilig worden opgeslagen. Het biedt robuuste upload- en downloadfunctionaliteiten voor deze bestanden, met beveiligingsfuncties die ervoor zorgen dat alleen geautoriseerde gebruikers toegang hebben tot de opgeslagen bestanden. Hiervoor moest dus ook de Firebase Authentication worden ingesteld. Hierbij is gekozen voor de optie authenticatie via e-mailadres en wachtwoord.

**Fase 6: Instellingen**\
Als laatste functionaliteit van de applicatie zijn de instellingen ontwikkeld. Het aanpassen van accountgegevens verloopt wederom via Firebase Authentication en Storage. Voor het herstellen van de data wordt de JSON-database opgeslagen in de Firestore wat alle huidige data overschrijft. Voorafgaand worden alle door de gebruiker geüploade foto's (inclusief profielfoto) verwijderd uit de Storage. De laatste functionaliteit was de optie om te kunnen switchen naar een dark mode, een UI-instelling die een donker kleurenschema gebruikt. Hiervoor is gebruik gemaakt van de ingebouwde ondersteuning voor dark mode van Vuetify.

**Fase 7: Two-factor authentication**\
Tot slot moest een two-factor identificatie gesimuleerd worden met behulp van de 'Local Storage' van de browser. Firebase Authentication biedt zelf ook een two-factor identificatie aan via SMS Multi-factor Authentication. Deze kan gemakkelijk worden ingesteld en biedt een extra beveiligingslaag aan de gebruikersaccounts. Omdat voor deze opdracht gewerkt wordt met fictieve accounts zonder mobiele telefoonnummers, wordt deze uit twee stappen bestaande inlogmethode gesimuleerd. Nadat de gebruiker door Firebase is geïdentificeerd aan de hand van het e-mailadres en wachtwoord, wordt een willekeurige zes-cijferige code opgeslagen in de 'Local Storage' van de browser. Deze moet worden ingevoerd in een prompt. Na een correcte identificatie wordt de gebruiker doorgestuurd naar het dashboard.

**Fase 8: Testen**\
De applicatie is uitgebreid getest door twee personen. Alle functionaliteiten zijn uitvoerig doorlopen. Hieruit kwamen nog enkele problemen en toevoegingen voor een verbeterde gebruikerservaring naar voren. Deze zijn allen verwerkt.

**Fase 9: Productiebuild en hosten**\
Volgt nog...

## Onvoltooide onderdelen
Er zijn een aantal onderdelen die nog aandacht vereisen bij een definitieve versie na dit prototype. De functionaliteiten van 'recent' en 'zoeken', die bereikt kunnen worden via de knoppen in de navigatiebalk onderaan, zijn nog niet verder uitgewerkt. De reden hiervoor is dat voor dit prototype de focus lag op de vier hoofdfuncties in het dashboard, zoals in de opdracht is omschreven. Hetzelfde geldt voor de knop 'meldingen' te vinden rechtsbovenin naast de knop 'uitloggen'. \
Bij het wijzigen van het e-mailadres vereist Firebase Authentication het sturen van een verificatie e-mail. Omdat bij deze opdracht fictieve e-mailadressen worden gebruikt, wordt het updaten van het e-mailadres gesimuleerd via de console.\
Tot slot moet de two-factor authenticatie in zijn geheel worden geregeld via Firebase. De simulatie via de 'Local Storage' is uiteraard niet veilig en zorgt er tevens voor dat na de eerste stap de gebruiker al door Firebase is geïdentificeerd. De gebruiker zou hierdoor in principe al in de applicatie kunnen door handmatig de link in de adresbalk van de browser te typen en hiermee de tweede stap van het inloggen ontwijken.

## Security
Door middel van de two-factor authenticatie is de applicatie alleen beschikbaar voor geauthoriseerde gebruikers. Bij een foutieve inlogpoging wordt een algemene foutmelding gegeven die geen specifieke details onthult over welke inloggegevens - wachtwoord of e-mailadres - onjuist zijn, om zo informatielekken te voorkomen. De veiligheid van de applicatie wordt hierbij versterkt door het gebruik van Firebase voor zowel de authenticatie als opslag van data en bestanden. Alle gegevens worden opgeslagen in Firebase, waarbij strikte beveiligingsregels gelden die ongeautoriseerde toegang voorkomen. Bestanden worden veilig beheerd met Firebase Storage, dat sterke upload- en downloadbeveiligingen biedt. Gebruikersinput wordt door Vue.js voorzien van escape sequences om XSS-aanvallen te voorkomen. Packages worden up-to-date gehouden met behulp van `npm audit`. Er is geen gebruik gemaakt van onbetrouwbare templates of third-pary packages en het gebruik van iframes zijn vermeden.\
Voor toekomstige ontwikkelingen is het aanbevolen een overstap te maken naar Pinia (vervanging voor Vuex) en Vite (vervanging voor Vue CLI), die niet alleen modernere en efficiëntere bouwprocessen beloven, maar ook verbeterde beveiligingsmaatregelen. Tot slot moet natuurlijk de two-factor authenticatie volledig via Firebase worden geregeld.

## Usability
De applicatie is zo gebruiksvriendelijk mogelijk gemaakt en voldoet aan de 10 heuristieken van Jacob Nielsen. De applicatie geeft feedback na gebruikersacties (zoals data opslaan/verwijderen), waardoor gebruikers weten dat hun commando's zijn ontvangen en verwerkt. Er wordt een laadwiel getoond bij het ophalen of opslaan van data, wanneer de gebruiker een paar tellen moet wachten tot dit is voltooid. Er worden duidelijke en consistente taal en symbolen gebruikt. Er kan makkelijk genavigeerd worden door de app door middel van Vue Router en duidelijke navigatie. De beniening is consequent door gebruik van dezelfde knoppen en symbolen. De applicatie is ontworpen om fouten te voorkomen, met duidelijke opties en bevestigingen voordat acties worden uitgevoerd die significante gevolgen kunnen hebben. De applicatie maakt gebruik van iconen die het makkelijk maken voor gebruikers om functies te herkennen. De bediening is flexibel en eenvoudig. Dit wordt onder andere bereikt door het sluiten van formulieren bij het opslaan van data, het automatisch openen van een nieuw toegevoegd formulier en het weer redirecten naar het dashboard, wanneer een inspectie is voltooid. De interface van de app is niet overladen met overbodige informatie of elementen die niet direct bijdragen aan de gebruikersdoelen. Als er fouten optreden worden er duidelijke en begrijpelijke foutmeldingen gegeven die de gebruiker helpen het probleem te begrijpen en op te lossen. Contactinformatie van de beheerder van de app wordt opgenomen in de informatiepagina, zodat de gebruiker te allen tijde hulp kan inschakelen indien nodig.

## Accessibility
De toegankelijkheid van de applicatie voldoet minimaal aan de WCAG 2.1-richtlijnen van niveau A door middel van tekstalternatieven voor niet-tekstuele content (op decoratieve afbeeldingen na), en duidelijke, leesbare content. De applicatie heeft een duidelijke structuur en over het algeheel dezelfde opbouw. Er zijn paginatitels, koppen en subkoppen gebruikt voor alle ‘pagina’s’ en er zijn labels gebruikt bij de formulieren. Er zijn geen presentaties die alleen met kleur te begrijpen zijn. Alles is ondersteunt met tekstuele toelichting. De gehele applicatie is te bereiken middels toetsenbordnavigatie. De applicatie bevat geen audio en video en heeft geen flikkerende content. Omdat er geen uitgebreide navigatie aan de bovenkant van de pagina is, is een ‘skip to content’-link minder relevant en is niet gebruikt in deze applicatie. Door deze maatregelen is de applicatie toegankelijk voor een breed publiek, inclusief gebruikers met beperkingen, in lijn met de WCAG 2.1-richtlijnen van niveau A.

## Style guides en best practices
Bij het coderen is zoveel mogelijk rekening gehouden met de style guides en best practices. Zo bestaan namen van componenten uit meerdere woorden en zijn PascalCase en kebab-case in het DOM-template. Bevatten kindcomponenten die nauw verbonden zijn met hun ouder de naam van de oudercomponent als voorvoegsel. Props zijn getypeerd en waar nodig gevalideerd. Ze zijn camelCase bij declaratie en kebab-case in de templates. Class definities zijn PascalCase. Er is altijd een key ingesteld bij v-for. Door de gehele code zijn de afkortingen : voor v-bind, @ voor v-on en # voor v-slots gebruikt. En tot slot is de aanbevolen volgorde voor component-/instantieopties en voor de attributen in elementen aangehouden.