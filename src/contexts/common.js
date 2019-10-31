import React, {createContext, useState} from 'react';

const CommonContext = createContext();
const {Provider, Consumer: CommonConsumer} = CommonContext;

function CommonProvider(props){
    const [isDrawerShown, setIsDrawerShown] = useState(false);
    const [isModalShown, setIsModalShown] = useState(true);
    const [pokemon, setPokemon] = useState('');
    const [modalType, setModalType] = useState('SELECT_POKEMON');

    const state = {
        isModalShown,
        isDrawerShown,
        pokemon,
        modalType
    };


    const actions = {
        changePokemon: (name) => {
            setPokemon(name);
            setIsModalShown(false);
        },
        toggleDrawerMenu: () => {
            setIsDrawerShown(!isDrawerShown);
        },
        toggleModal: () => {
            setIsModalShown(!isModalShown);
            if(!isModalShown) setModalType('');
            console.log(this)

        },
        changeModalType: modalType => {
            setModalType(modalType);
            setIsDrawerShown(false);
            setIsModalShown(true);
        }
    };

    return (
        <Provider value={{state, actions}}>
            {props.children}
        </Provider>
    );
}

function useCommonConsumer(WrappedComponent){
    return parentProps => {
        return (
            <CommonConsumer>
                {
                    props => {
                        return (
                            <WrappedComponent value={props}/>
                        )
                    }
                }
            </CommonConsumer>
        );
    };

}

export {
    CommonConsumer,
    CommonProvider,
    useCommonConsumer,
    CommonContext
};
