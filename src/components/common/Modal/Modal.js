import React from 'react';
import {useCommonConsumer} from '../../../contexts/common';
import SelectPokemon from '../../SelectPokemon/SelectPokemon';
import PokemonInfo from '../../PokemonInfo/PokemonInfo';
import string from '../../../util/modalString';
import './Modal.scss'

function Modal(props){
    const {state, actions} = props.value;
    const {isModalShown, modalType, pokemon} = state;
    const {toggleModal, changePokemon} = actions;
    console.log(modalType)

    let currentComponent = <div>Modal Content Not Found.</div>;
    if(modalType === 'SELECT_POKEMON') currentComponent = (<SelectPokemon onChangePokemon={changePokemon}/>);
    else if(modalType === 'POKEMON_INFO') currentComponent = (<PokemonInfo pokemon={pokemon}/>);

    return (
        <div className={'modal ' + (isModalShown ? 'active' : '')}>
            <div className="modal-wrap">
                <div className="title">
                    {string.getTitle(modalType)}
                </div>
                <div className="content-wrap">
                    {
                        currentComponent
                    }

                </div>
                <div className="bottom">
                    <button onClick={toggleModal}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default useCommonConsumer(Modal);
