import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import mongoose from "mongoose";

const MONGODB = `mongodb+srv://what2watch:what2watch@what2watch.ylfc8dh.mongodb.net/?retryWrites=true&w=majority`;

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