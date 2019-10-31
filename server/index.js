const path = require('path');
const ejs = require('ejs');
const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const {ApolloServer} = require('apollo-server-express')
const schema = require('./graphql/schemas/pokemonSchema');

const app = express();

app.set('views', 'build');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, './resources/image')));

app.use('/graphql', bodyParser.json(), graphqlHTTP({
    graphiql: true,
    schema: schema,
    tracing: true, //모니터링 기능 켜기,
    cacheControl: true //캐시 활성화
}));
//
// app.use('/graphql');

const router = express.Router();

router.get('/',(req, res, next) => {
    res.render('index.html');
});

app.use(router);

app.listen(12000, () => {
    console.log('listen.')
});
