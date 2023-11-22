# What2Watch 2.0

What2Watch 2.0 er en applikasjon utviklet i forbindelse med prosjektarbeid 2 i faget IT2810 Webutvikling på NTNU Høsten 2023. Prosjektet gikk ut på å presentere en stor mengde data. Ideen bak denne applikasjonen er å gi filmforslag til en bruker som ønsker å se film, men sliter med å bestemme seg for hva hen vil se. Brukeren får også mulighet til å favoritt-merke filmer hen ønsker å se, og gi anmeldelser på filmer hen har sett.

## Installering og bruk

Applikasjonen kan sjekkes ut på følgende URL (NB! Dette krever at du er på NTNU nett/VPN):

> http://it2810-45.idi.ntnu.no/project2

Eventuelt kan repoet kan klones med:

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-45/prosjekt-2.git`

Da kan frontend kjøres lokalt, med kobling til backend som kjører på VM (NB! Dette krever at du er på NTNU nett/VPN):

`cd frontend`  
`npm install`  
`npm run dev`

Prosjektet vil da kjøres lokalt på:

> http://localhost:5173/project2

## Tilgjengelighet og bærekraft

Dette prosjektet benytter seg av Chakra UI og React. Chakra UI er et populært React-komponentbibliotek av flere grunner. Det er enkelt å bruke, det er enkelt å tilpasse, og det er tilgjengelig. Chakra UI er utviklet med tanke på tilgjengelighet, og har derfor innebygde funksjoner som gjør det enkelt å lage tilgjengelige nettsider. Chakra UI overholder WAI-ARIA retningslinjer, noe som sikrer tilgjengelighet på tvers av komponentene.

Ved bruk av React og Chakra UI benytter vi også i stor grad gjenbruk av kode i form av komponenter. Dette gjør at vi kan skrive kode som er mer gjenbrukbar, og dermed mer bærekraftig. Som et åpen kildekode-prosjekt, er Chakra UI avhengig av et fellesskap av bidragsytere. Dette samfunnsdrevne aspektet fremmer deling av kunnskap og ressurser, som er en nøkkelkomponent i bærekraftig teknologiutvikling.

Vi har også et fokus på å gjøre så få kall til backend som mulig, dette gjør vi blant annet gjennom dynamisk lasting. Dette gjør at vi kan redusere belastningen på serveren, og dermed redusere energiforbruket. Samtidig som vi reduserer energiforbruket, gjør vi også brukeropplevelsen og tilgjengeligheten bedre ved å redusere ventetiden.

Vi har også valgt å vise detaljer om en film gjennom en modal, i stedet for å navigere til en ny side. Dette gjør at brukeren slipper å vente på at en ny side skal lastes inn, og kan dermed bruke mindre tid på å finne en film å se. Dette gjør også at vi reduserer antall kall til backend, siden alt lastes inn ved ett kall. Dette gjør at vi reduserer energiforbruket, og dermed gjør applikasjonen mer bærekraftig.

Vi bruker også dark mode som default på nettsiden. Dette gjør at vi reduserer energiforbruket til brukeren, og dermed gjør nettsiden mer bærekraftig. Dette gjør vi ved å bruke Chakra UI sitt innebygde dark mode, som gjør at vi kan bytte mellom dark mode og light mode med ett tastetrykk.

## Beslutninger

Gruppen har valgt å la applikasjonen ha en utforming som gir følelsen av å være logget inn som en bruker. Likvell er det ingen funksjonalitet for å logge inn, eller lage egen bruker i frontend. Dette ble gjort bevisst, da applikasjonen gir mening å bli brukt som en logget inn bruker. Det har også gjort at vi har utviklet applikasjonen med en tanke i bakhodet om at applikasjonen i framtiden skal kunne videreutvikles til å være en siden med flere brukere, registrering og innlogging. Dette gjør bruk av siden merkelig, da det ser ut som alle anmeldelsene kommer fra samme person, og "alle" har samme favorittfilmer. Likevell føler vi dette er et godt valg, da siden føles mer naturlig. I tillegg har det gjort utviklingsprossesen bedre, da utvikling av applikasjon som brukes av flere brukere ofte krever dynamiske løsninger og smidige beslutninger.
