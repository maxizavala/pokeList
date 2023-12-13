import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import PokeListContainer from "./components/PokeListContainer";
import React from 'react';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <PokeListContainer />
            </div>
        </ApolloProvider>
    );
}

export default App;
