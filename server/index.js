const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const {ApolloServer} = require('apollo-server-express')
const schema = require('./graphql/schemas/pokemonSchema');

const app = express();

app.use('/graphql', bodyParser.json(), graphqlHTTP({
    graphiql: true,
    schema: schema,
    tracing: true, //모니터링 기능 켜기,
    cacheControl: true //캐시 활성화
}));
//
// app.use('/graphql');

app.listen(12001, () => {
    console.log('listen.')
});