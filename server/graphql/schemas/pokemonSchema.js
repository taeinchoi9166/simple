const Graphql = require('graphql');
const request = require('request');

const abilityType = new Graphql.GraphQLObjectType({
    name: 'ability',
    fields: {
        name: {type:Graphql.GraphQLString}
    }
});

const pokemonType = new Graphql.GraphQLObjectType({
    name: "pokemon",
    fields: {
        id: {type:Graphql.GraphQLInt},
        name: {type:Graphql.GraphQLString},
        abilities: {type: Graphql.GraphQLList(abilityType)},
    }
});



const queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        pokemon: {
            type: pokemonType,
            args: {
                id: {type: Graphql.GraphQLInt}
            },
            resolve: async (_,{id},__,___) => {
                const getPokemon = () => new Promise((resolve, reject) => {
                    request(`https://pokeapi.co/api/v2/pokemon/${id}`,(err, field, body) => {
                        const result = JSON.parse(body);
                        resolve({
                            id:result.id,
                            name:result.name,
                            abilities:result.abilities.map(item => item.ability)
                        });
                    });
                });
                return await getPokemon();
            }
        }
    }
});

const schema = new Graphql.GraphQLSchema({query: queryType});

module.exports = schema;