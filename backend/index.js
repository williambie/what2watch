import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGODB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority`;

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
