import React from 'react';
import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import {QueryError} from '../common/QueryError/QueryError';

const GET_POKEMON_LIST = gql`
    {
        pokemonImageList {
            kr_name,
            en_name,
            imageURL
        }
    }
`;


function SelectPokemon({onChangePokemon}){
    return (
        <ul>
            <Query query={GET_POKEMON_LIST}>
                {
                    ({loading, error, data}) => {
                        if(loading) {
                            return (
                                <div>
                                    loading....
                                </div>
                            )
                        }

                        if(error){
                            return <QueryError/>
                        }

                        if(data && data.pokemonImageList){
                            console.log(data)
                            return data.pokemonImageList.map(item => (
                               <li style={{width:'4rem',height:'4rem',float:'left', cursor:'pointer'}} onClick={() => {onChangePokemon(item.en_name)}}>
                                   <img src={item.imageURL} alt="" style={{width:'100%',padding:'0.2rem'}}/>
                                   <div style={{width:'100%', textAlign:'center'}}>{item.kr_name}</div>
                               </li>
                            ));
                        }
                    }
                }
            </Query>
        </ul>
    );
}

export default SelectPokemon;
