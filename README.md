# What2Watch 2.0

What2Watch 2.0 er en applikasjon utviklet i forbindelse med prosjektarbeid 2 i faget IT2810 Webutvikling på NTNU Høsten 2023. Prosjektet gikk ut på å presentere en stor mengde data.  Ideen bak denne applikasjonen er å gi filmforslag til en bruker som ønsker å se film, men sliter med å bestemme seg for hva hen vil se. Brukeren får også mulighet til å favoritt-merke filmer hen ønsker å se, og gi anmeldelser på filmer hen har sett.

## Installering og bruk

Applikasjonen kan sjekkes ut på følgende URL:

    https://it2810-45.idi.ntnu.no/project2

Eventuelt kan repoet kan klones med:

    git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-45/prosjekt-2.git

Da må backend settes opp på følgende måte:

    cd backend
    npm install -g
    nodemon app

Frontend settes opp slik:

    cd ../frontend
    npm install
    npm run dev

Prosjektet vil da kjøres lokalt på:

    http://localhost:5173/project2

## Frontend

- Applikasjonen er opprettet med rammeverket Vite (https://vitejs.dev/), som bygger på React og TypeScript
- React Router brukes for å navigere rundt på siden
- Komponentbiblioteket Chakra UI brukes for å designe siden. Chakra er kjent for å følge WAI ARIA standard for universell utforming
- Redux brukes for Global State Mangement
- For å kommunisere med backend brukes det Apollo Client
- Prettier og ESLint brukes for kodekontroll og -formatering

## Backend

- Prosjektet lagrer dataen i en MongoDB database, og bruker mongoose for å koble den til server
- Serveren kjører med Apollo Server

## Funksjonelle krav

> Løsningen skal presentere søk i liste, lagt opp til håndtering av store resultatsett.

Denne applikasjonen løser dette ved å vise en grid med et gitt antall filmer fra katalogen. Nederst på siden finner brukeren en paginator for dynamisk lasting av filmer. Løsningen vi har valgt presenterer mange filmer til brukeren først, noe som gjør det enklere å finne en film som brukeren er interessert i.

> Brukeren skal kunne søke i en katalog ved å formulere et søk og få presentert et søkeresultat. Brukeren skal kunne lese mer detaljer om hvert objekt i resultatet og ha en interaksjon med de.

Brukeren kan søke fritt i søkefeltet, og vil få opp alle treff, hvor man kan bla i sidene på resultatet. Deretter kan bruker selv gå inn på en og en film for å se flere detaljer. Der vil brukeren kunne markere en film som favoritt, for å huske den til senere eller legge igjen en skriftlig review.

> En bruker skal kunne gjøre et valg (ala filtrering eller sortering) som påvirker utvalget av det som presenteres og hvordan det presenteres. Disse valgene skal huskes selv om siden reloades.

Brukeren kan velge kategori for å endre utvalget av filmene som blir presentert. I tillegg har brukeren mulighet å sortere filmene som er presentert med en sorteringsknapp. Sorteringen gjør det mulig å sortere etter popularitet, brukerscore, og tittel. Både sorteringen og kategorivalget brukeren gjør lagres i session storage og vil dermed huskes selv om siden reloades. Disse valgene lagres også som global state, noe som gjør at de huskes selv om det navigeres rundt på siden.

> Det skal inngå brukergenererte data som lagres og presenteres

Som nevnt i tidligere punkt, kan brukeren favoritt-merke og legge igjen en review. Disse brukergenererte dataene lagres henholdsvis som favorittliste for den enkelte bruker og reviews under hver film hvor man kan se egne og andres. Dataene lagres i databasen.

> Siden skal ha godt design, med fornuftige valg som harmonerer med typen data som presenteres

Siden er laget med et minimalistisk design, med mørke farger og hvit skrift. Dette passer temaet med filmer godt da plakatene kommer til sin rett og komponentene ser bra ut sammen. Sidene er ryddige og det er enkelt å navigere fra sted til sted. Det er i tillegg lagt inn animasjoner og css som gir tilbakemelding til brukeren ved interaksjon. Dersom brukeren ønsker kan "light mode" brukes med samme design, motsatte farger.

> Løsningen skal demonstrere aspekter ved web accessibility og bærekraftig utvikling

Universell utforming og bærekraftig utvikling er gjennomført ved å bruke gode kodepraksiser. Det kan ses i hvordan prosjektet er strukturert og komponenter er navngitt. Videre har Aria-labels blitt brukt for å gi tilgjengelig tekst på ikoner og regioner på siden. Dette gjør at skjermlesere og tastaturnavigasjon blir mulig og enklere. Videre finnes det en knapp for "Dark mode" slik at brukeren kan tilpasse kontrasten for god synlighet. Viktigst av alt er endringer slik som mer åpenbar hjem-knapp, intuitiv plassering av knapper i nav-bar og kontrast i tekstfelt oppdatert fra første prosjekt. Det kan også nevnes at bruken av Chakra UI, som er et komponentbibliotek, fører til bedre kodepraksis i seg selv.
