# Frontend

Frontend er bygget med Vite. Dette er et rammeverk som bruker React med TypeScript og kommer med en rekke avhengigheter. Applikasjonen har i hovedsak en Navbar og en hoveddel. Navbaren har en logo, som linker til hjem-siden, et søkefelt, og en profilknapp. Hovedsiden inneholder en grid som viser filmer, og knapper for sortering og filtrering. Dataene presenteres dynamisk, med bruk av blaing i sider for å navigere mellom sider med filmer. Hver side viser opp til 20 filmer. Filmene kan sorteres etter tittel, popularitet og brukerscore. Det er også mulig å søke i filmsettet, og søkefunksjonaliteten fungerer sammen med filtrering og sortering. Ved hjelp av profilknappen kan også brukeren navigere til "My Favourites" som er en side hvor alle brukerens favorittfilmer vises på samme måte som på hovedsiden. Hver film kan også trykkes på for å åpne en modul som viser mer info om hver film, samt skuespillere og filmanmeldelser lagt til av brukeren. Brukeren kan også her legge filmer til som favoritt og legge til anmeldelser.

## Chakra UI

Brukergrensesnittet er laget med tredjeparts rammeverket Chakra UI. Dette er et rammeverk som kommer med ferdiglagde React komponenter. Disse komponentene kan enkelt tilpasses med bruk av inline css kommander. Dette gjør at Chakra UI eliminerer behovet for css filer, og gir likevell fine og brukervennlige komponenter. Det er også enkelt å impletere dark/light mode ved hjelp av Chakra UI. Dette har vi gjort, og brukeren kan endre til sin preferanse i profilknappen. 

## Struktur

```
|-- frontend
|   |-- docs
|   |-- public
|   |   |-- logo.svg
|   |-- src
|   |   |-- __tests__
|   |   |   |-- App.test.tsx
|   |   |-- assets
|   |   |   |-- logo.png
|   |   |-- components
|   |   |   |-- Main
|   |   |   |   |-- Main.tsx
|   |   |   |   |-- __test__
|   |   |   |   |   |-- Main.test.tsx
|   |   |   |   |-- Favourites
|   |   |   |   |   |-- Favourites.tsx
|   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |-- Favourites.test.tsx
|   |   |   |   |-- MovieGrid
|   |   |   |   |   |-- MovieGrid.tsx
|   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |-- MovieGrid.test.tsx
|   |   |   |   |   |-- LoadingCard
|   |   |   |   |   |   |-- LoadingCard.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- LoadingCard.test.tsx
|   |   |   |   |   |-- MovieCard
|   |   |   |   |   |   |-- MovieCard.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- MovieCard.test.tsx
|   |   |   |   |   |   |-- MovieModal
|   |   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |   |-- MovieModal.test.tsx
|   |   |   |   |   |   |   |-- FavouriteButton
|   |   |   |   |   |   |   |   |-- FavouriteButton.tsx
|   |   |   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |   |   |-- FavouriteButton.test.tsx
|   |   |   |   |   |   |   |-- Reviews
|   |   |   |   |   |   |   |   |-- Reviews.tsx
|   |   |   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |   |   |-- Reviews.test.tsx
|   |   |   |   |   |   |-- UserVoteAverage
|   |   |   |   |   |   |   |-- UserVoteAverage.tsx
|   |   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |   |-- UserVoteAverage.test.tsx
|   |   |   |   |-- Paginator
|   |   |   |   |   |-- Paginator.tsx
|   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |-- Paginator.test.tsx
|   |   |   |   |-- SortingFiltering
|   |   |   |   |   |-- GenreFilter
|   |   |   |   |   |   |-- GenreFilter.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- GenreFilter.test.tsx
|   |   |   |   |   |-- ResetFilters
|   |   |   |   |   |   |-- ResetFilters.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- ResetFilters.test.tsx
|   |   |   |   |   |-- SortingButton
|   |   |   |   |   |   |-- SortingButton.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- SortingButton.test.tsx
|   |   |   |-- Navbar
|   |   |   |   |-- __tests__
|   |   |   |   |   |-- NavBar.test.tsx
|   |   |   |   |-- ProfileButton
|   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |-- ProfileButton.test.tsx
|   |   |   |   |   |-- ColorModeSwitch
|   |   |   |   |   |   |-- ColorModeSwitch.tsx
|   |   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |   |-- ColorModeSwitch.test.tsx
|   |   |   |   |-- SearchBar
|   |   |   |   |   |-- SearchBar.tsx
|   |   |   |   |   |-- __tests__
|   |   |   |   |   |   |-- SearchBar.test.tsx
|   |   |-- queries
|   |   |   |-- queries.tsx
|   |   |-- redux
|   |   |   |-- searchSlice.ts
|   |   |   |-- store.ts
|   |   |-- test
|   |   |   |-- setup.ts
|   |   |-- types
|   |   |   |-- reduxTypes.ts
|   |   |   |-- types.ts
|   |   |-- utils
|   |   |   |-- test-utils.tsx
|   |   |-- App.tsx
|   |   |-- index.tsx
|   |   |-- theme.ts
|   |   |-- vite-env.d.ts
|-- index.html
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
```

## Avhengigheter

- **@apollo/client:** Bibliotek for klienten som brukes med Apollo GraphQL, ofte brukt for å håndtere GraphQL i React-apper.
- **@chakra-ui/icons:** Ikonkomponenter for Chakra UI, et populært React UI-bibliotek.
- **@chakra-ui/react:** Chakra UI, et React UI-bibliotek som gir enkle og tilpassbare komponenter.
- **@emotion/react:** Emotion biblioteket for håndtering av CSS i JavaScript.
- **@emotion/styled:** Emotion-biblioteket for styled components i React.
- **@reduxjs/toolkit:** Toolkit for Redux, en statshåndteringsbibliotek for React.
- **framer-motion:** Animasjonsbibliotek for React.
- **graphql:** JavaScript-implemetasjon av GraphQL, brukt for å sende GraphQL-forespørsler.
- **lodash:** Verktøybibliotek for å forenkle håndtering av data i JavaScript.
- **react:** Hovedbiblioteket for React-apper.
- **react-dom:** React DOM-biblioteket for å håndtere DOM-spesifikke operasjoner i React-apper.
- **react-icons:** Bibliotek med ikonkomponenter for React.
- **react-redux:** Redux bindings for React.
- **react-router-dom:** React-bibliotek for håndtering av navigasjon.
- **redux:** Bibliotek for sentralisert tilstandsstyring i JavaScript-apper.
- **redux-persist:** Redux-bibliotek for å lagre og gjenopprette tilstand på tvers av økter.

### Utviklingsavhengigheter

- **@testing-library/dom:** Testing-verktøy for DOM-manipulasjon.
- **@testing-library/jest-dom:** Jest-tillegg for testing av DOM-elementer.
- **@testing-library/react:** React-testing-verktøy for enklere testing av React-komponenter.
- **@testing-library/user-event:** Testing-verktøy for brukerinteraksjoner i testing-biblioteket.
- **@types/node:** TypeScript-typer for Node.js.
- **@types/react:** TypeScript-typer for React.
- **@types/react-dom:** TypeScript-typer for React DOM.
- **@types/react-test-renderer:** TypeScript-typer for React-test-renderer.
- **@typescript-eslint/eslint-plugin:** ESLint-plugin for TypeScript.
- **@typescript-eslint/parser:** ESLint-parser for TypeScript.
- **@vitejs/plugin-react:** Vite-plugin for React-integrasjon.
- **@vitest/coverage-v8:** Testdekning for V8-motoren.
- **eslint:** Verktøy for å finne og fikse problemer i JavaScript-kode.
- **eslint-plugin-react-hooks:** ESLint-plugin for React-hooks-regler.
- **eslint-plugin-react-refresh:** ESLint-plugin for React Refresh-regler.
- **happy-dom:** Virtuelt DOM-bibliotek for testing.
- **husky:** Git-hooks-bibliotek for å kjøre skript ved git-handlinger.
- **jsdom:** JavaScript-implementasjon av DOM for Node.js.
- **prettier:** Verktøy for å formatere kode.
- **pretty-quick:** Verktøy for å kjøre Prettier på endrede filer i git.
- **react-test-renderer:** React-test-verktøy for rendringskomponenter til et format som kan testes.
- **typescript:** TypeScript-språket.
- **vite:** Vite, et raskt byggverktøy for moderne webutvikling.
- **vitest:** Testbibliotek for Vite.

## Testing

### Komponenttesting

Komponenttestingene er skrevet med Vitest og @testing-library. Alle komponentene testes i forskjellig grad i totalt 47 tester fordelt på 18 filer. Testfilene er lagt i mapper med navn __tests__ på samme sted som filene de tester. For å kjøre alle testene brukes kommandoen "npm run test". Disse testene utgjør en testdekningsgrad på 90%. For å sjekke dekningsgraden kan en bruke kommandoen "npm run coverage". (NB! Begge disse kommandoene må kjøres i "frontend")

![Testdekningsgrad](.docs/unittest.png)

### End-to-end

Det er også lagt til automatisk ende-til-ende testing med Playwright. Dette kan kjøres med kommandoen ...