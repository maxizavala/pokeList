import { gql, useQuery } from '@apollo/client';

import React from 'react';

const GET_POKEMONS = gql`
    query GetPokemons {
        pokemons(first: 10) {
        id
        name
        }
    }
`;

function PokeListContainer() {
    const { loading, error, data } = useQuery(GET_POKEMONS);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const pokemons = data.pokemons;

    return (
        <ul>
            {pokemons.map(pokemon => (
                <li key={pokemon.id}>{pokemon.name}</li>
            ))}
        </ul>
    );
}

export default PokeListContainer;
