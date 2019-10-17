const Graphql = require('graphql');
const request = require('request');

const abilityType = new Graphql.GraphQLObjectType({ //스키마
    name: 'ability',
    fields: { // 상호작용할 데이터들
        name: {type:Graphql.GraphQLString}, //name : {type: Graphql 타입}
        description: {type:Graphql.GraphQLString}
    }
});
const moveType = new Graphql.GraphQLObjectType({
    name: "move",
    fields: {
        // id: {type: Graphql.GraphQLInt},
        name: {type: Graphql.GraphQLString},
        type: {type: Graphql.GraphQLString},
        description: {type:Graphql.GraphQLString}
    }
});

const pokemonType = new Graphql.GraphQLObjectType({
    name: "pokemon",
    fields: {
        id: {type:Graphql.GraphQLInt},
        name: {type:Graphql.GraphQLString},
        abilities: {type: Graphql.GraphQLList(abilityType)},
        image: {type:Graphql.GraphQLString},
        moves: {type:Graphql.GraphQLList((moveType))}
    }
});




const queryType = new Graphql.GraphQLObjectType({
    name: "Query",
    fields:{
        pokemon: {
            type: pokemonType,
            args: { //파라미터들
                id: {type: Graphql.GraphQLInt}
            },
            resolve: async (_,{id},__,___) => {
                const getPokemon = () => new Promise(async (resolve, reject) => {
                    request(`https://pokeapi.co/api/v2/pokemon/${id}`,(err, field, body) => {
                        const result = JSON.parse(body);

                        let retVal = {
                            id:result.id,
                            name:result.name,
                            abilities:result.abilities.map(item => item.ability.name),
                            image: result.sprites.front_default,
                            moves: result.moves.map(item => item.move.name)
                        };


                        resolve(retVal);
                    });

                });

                const getAbility = ({name}) => new Promise(resolve => {
                    request(`https://pokeapi.co/api/v2/ability/${name}`, (err, field, body) => {
                        const result = JSON.parse(body);

                        let retVal = {
                            name: result.names[8].name,
                            description: result.flavor_text_entries[8].flavor_text
                        }

                        resolve(retVal);
                    })
                })

                const getMove = ({name}) => new Promise(resolve => {
                    request(`https://pokeapi.co/api/v2/move/${name}`, (err, field, body) => {
                       const result = JSON.parse(body);

                       let retVal = {
                           name: result.names[8].name,
                           type: result.type.name,
                           description: result.flavor_text_entries[8].flavor_text
                       };

                       resolve(retVal);
                    });
                })
                let pokemon =  await getPokemon();

                pokemon.moves = await pokemon.moves.map( async item => {
                    return await getMove({name:item});
                });
                pokemon.abilities = await pokemon.abilities.map( async item => {
                    return await getAbility({name:item});
                })

                return pokemon;
            }
        },
        
    }
});

const schema = new Graphql.GraphQLSchema({query: queryType});

module.exports = schema;
