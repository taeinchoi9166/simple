import {createReducer} from '../common';

const TOGGLE_DRAWER_MENU = 'common/TOGGLE_DRAWER_MENU';
const SELECT_POKEMON= 'common/SELECT_POKEMON';

export const types = {
    TOGGLE_DRAWER_MENU,
    SELECT_POKEMON
};

const toggleDrawerMenu = () => ({type: TOGGLE_DRAWER_MENU});
const selectPokemon = pokemon => ({type: SELECT_POKEMON, pokemon});

export const actions = {
    toggleDrawerMenu,
    selectPokemon
}

const initState = {
    isDrawerMenuShown: false,
    pokemon: '',
};

export default createReducer(initState, {
    [TOGGLE_DRAWER_MENU]: (state, action) => {
        state.isDrawerMenuShown = !state.isDrawerMenuShown;
    },
    [SELECT_POKEMON]: (state, action) => {
        state.pokemon = action.pokemon;
    }
});
