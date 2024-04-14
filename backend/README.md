# Backend

The backend is built in JavaScript, using Apollo Server and mongoose.

## Data Foundation

The data is retrieved from [The Movie Database (TMDB)](https://www.themoviedb.org/) API. From here, movies, genres, and actors are fetched. For this application, we have chosen to fetch 2000 movies, along with their respective categories and actors.

## Database

The data is stored in a database from [MongoDB](https://www.mongodb.com/). In the database, we have 4 tables:

- **movies:** This table contains all the movies, along with their associated actors.
- **reviews:** Movie reviews are stored here.
- **users:** This database keeps track of users. Currently, there is only one pre-made user in it.
- **genres:** This table contains all the categories. They have their own table to match the structure of the data foundation.

## Structure

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

## Dependencies

- **@apollo/server**: Server implementation for Apollo GraphQL.
- **graphql**: A query language for APIs and a runtime for executing these queries.
- **mongodb**: The official MongoDB driver for Node.js.
- **mongodb-memory-server**: A MongoDB memory server for testing without the need for an actual MongoDB server.
- **mongoose**: A MongoDB object modeling tool.

## Developer Dependencies

- **dotenv**: Loads environment variables from a .env file.
- **nodemon**: Monitors changes in files and automatically restarts the server.
- **vitest**: A test runner for Vite projects.

## Testing

Testing in the backend is done with Vitest. In the backend, we test resolvers, which are used to fetch data from the database. MongoMemoryServer is used to create a "fake" database, which is used to test if the resolvers fetch data correctly. In total, there are 6 tests that test several of the resolvers.
