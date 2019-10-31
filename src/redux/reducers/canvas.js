import {createReducer} from '../common';

const LOAD_IMAGE = 'canvas/LOAD_IMAGE';
const ADD_PIXEL = 'canvas/ADD_PIXEL';
const CHANGE_COLOR = 'canvas/CHANGE_COLOR';

export const types = {
    LOAD_IMAGE,
    ADD_PIXEL,
    CHANGE_COLOR
};

const loadImage = imageData => ({type: LOAD_IMAGE, imageData});
const addPixel = point => ({type: ADD_PIXEL, point});
const changeColor = color => ({type: CHANGE_COLOR, color});

export const actions = {
    loadImage,
    addPixel,
    changeColor
};


const initState = {
    color: null,
    colorPoint: [],
    imageData: null,
    curPoint: []
};

export default createReducer(initState, {
    [LOAD_IMAGE]: (state, action) => {
        state.imageData = action.imageData;
    },
    [ADD_PIXEL]: (state, action) => {
        state.curPoint[action.x + ',' + action.y] = action.color;
    },
    [CHANGE_COLOR]: (state, action) => {
        state.color = action.color;
    }
})
