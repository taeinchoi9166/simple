import React, {useState} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {CommonProvider, useCommonConsumer} from './contexts/common';
import {Header} from "./components/common/Header";
import MainContainer from "./container/MainContainer";
import {Modal} from './components/common/Modal';

const client = new ApolloClient({
    uri: 'http://localhost:12000/graphql'
});


function App(){
    return (
        <ApolloProvider client={client}>
            <CommonProvider>
                <Header />
                <MainContainer />
                <Modal/>
            </CommonProvider>
        </ApolloProvider>
    )
}

export default App;
