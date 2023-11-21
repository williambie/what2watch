import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./types/typeDefs.js";
import { resolvers } from "./resolvers/resolvers.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGODB = process.env.CONNECTION_STRING;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB and start the server
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(async () => {
    console.log("MongoDB Connected");
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`Server ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
