import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import PokeListContainer from "./components/PokeListContainer";
import React from 'react';

const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app/',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <h2>Lista de Pokémon</h2>
                <PokeListContainer />
            </div>
        </ApolloProvider>
    );
}

export default App;
