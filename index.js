const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require('./graphql/resolvers')
const typeDefs = require("./graphql/typeDefs")
const { MONGODB } = require("./config.js");
mongoose.set("useUnifiedTopology", true);

const pubsub = new PubSub() 

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

const PORT = process.env.port || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MONGODB connected");
    return server.listen({ port: PORT });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err);
  });
