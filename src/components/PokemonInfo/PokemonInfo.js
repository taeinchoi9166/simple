import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import {QueryError} from '../common/QueryError/QueryError';

const GET_POKEMON_INFO = gql`
    query pokemon($name: String!){
        pokemon(name: $name){
            id,
            name,
            types,
            form,
            description,
            image
        }
    }
`;


function PokemonInfo({pokemon}){
    const errorComponent = (
        <div>
            오류입니다.
        </div>
    );

    const infoComponent = (
        <Query query={GET_POKEMON_INFO} variables={{name: pokemon}}>
            {
                ({loading, error, data}) => {
                    if(loading) return <div>loading....</div>

                    if(error) return <QueryError/>

                    if(data && data.pokemon){
                        const {name, types, form, description, image} = data.pokemon;
                        console.log(image)
                        return (
                            <div>
                                <img src={image} alt={'포켓몬 사진'} style={{width:'40%', height:'auto', margin:'0.7rem 30%'}}/>
                                <h2 style={{textAlign:'center'}}>{name}</h2>
                                <ul style={{display:'flex',justifyContent:'center', margin:'0.8rem 0'}}>
                                    {
                                        types.map(type => (<li style={{padding:'0.6rem', background:'#333', color:'#efefef', borderRadius: '0.4rem'}}>{type}</li>))
                                    }
                                </ul>
                                <div style={{width:'100%',padding:'1rem',textAlign:'center'}}>{form}</div>
                                <p>
                                    {description}
                                </p>
                            </div>
                        );
                    }
                }
            }
        </Query>
    );


    return pokemon ? infoComponent : errorComponent;
}

export default PokemonInfo;
