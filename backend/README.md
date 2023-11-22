# Backend

Backenden er laget i JavaScript, med bruk av Apollo Server og mongoose.

## Datagrunnlag

Dataene er hentet fra [The Movie Database (TMDB)](https://www.themoviedb.org/) sitt API. Herifra hentes det filmer, filmsjangre og skuespillere. For denne applikasjonen har vi valgt å hente 2000 filmer, med tilhørende kategorier og skuespillere.

## Database

Dataene lagres i database fra [MongoDB](https://www.mongodb.com/). I databasen har vi 4 tabeller:

- **movies:** Her ligger alle filmene, med tilhørende skuespillere.
- **reviews:** Her ligger filmanmeldeldsene
- **users:** Dette er en database som har oversikt over brukere. I øyeblikket er det bare en ferdiglaget bruker som ligger inne.
- **genres:** Her ligger alle kategoriene. De har sin egen tabell, da det matcher oppsettet til datagrunnlaget.

## Struktur

```
|-- backend
|   |-- models
|   |   |-- genre.js
|   |   |-- movie.js
|   |   |-- review.js
|   |   |-- user.js
|   |-- resolvers
|   |   |-- resolvers.js
|   |   |-- __tests__
|   |   |   |-- resolvers.test.js
|   |-- types
|   |   |-- typeDefs.js
|   |-- index.js
|   |-- package.json
|   |-- package-lock.json
|   |-- vite.config.ts
```

## Avhengigheter

- **@apollo/server**: Serverimplementering for Apollo GraphQL.
- **graphql**: Et spørringspråk for API-er og en kjøretid for å utføre disse spørringene.
- **mongodb**: Den offisielle MongoDB-driveren for Node.js.
- **mongodb-memory-server**: En MongoDB-minneserver for testing uten behov for en faktisk MongoDB-server.
- **mongoose**: Et elegant verktøy for objektmodellering i MongoDB.

## Utvikleravhengigheter

- **dotenv**: Laster miljøvariabler fra en .env-fil.
- **nodemon**: Overvåker endringer i filer og starter serveren på nytt automatisk.
- **vitest**: En testløper for Vite-prosjekter.

## Testing

Testing i backend er gjort med Vitest. I Backend tester vi resolvers, som brukes for å hente data fra databasen. MongoMemoryServer brukes for å lage en "falsk" database, som brukes for å teste om resolverne henter data på riktig måte. Til sammen er det 6 tester som tester flere av resolverne.
