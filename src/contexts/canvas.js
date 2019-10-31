import React, {createContext, useState} from 'react';

const {Provider, Consumer: CanvasConsumer} = createContext();

function CanvasProvider(props){

    return (
        <Provider>
            {this.props.children}
        </Provider>
    );
}
