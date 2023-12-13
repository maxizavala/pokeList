import { gql, useQuery } from '@apollo/client';

import React from 'react';

const SAMPLE_QUERY = gql`
    query samplePokeAPIquery {
        pokemon_v2_pokemon {
        id
        name
        height
        pokemon_v2_pokemonabilities {
            pokemon_v2_ability {
            name
            id
            }
        }
        }
        pokemon_v2_pokemontypepast_by_pk(id: 10) {
        pokemon_v2_type {
            id
            name
        }
        }
    }
`;

function PokeListContainer() {

    const { loading, error, data } = useQuery(SAMPLE_QUERY, {
        uri: 'https://beta.pokeapi.co/graphql/v1beta',
    });

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const pokemons = data.pokemon_v2_pokemon;
    const typeInfo = data.pokemon_v2_pokemontypepast_by_pk;

    return (
        <div>
            <ul>
            {pokemons.map(pokemon => (
                <li key={pokemon.id}>
                {`${pokemon.name} (ID: ${pokemon.id}, Altura: ${pokemon.height})`}
                <ul>
                    <li>Abilities:</li>
                    <ul>
                    {pokemon.pokemon_v2_pokemonabilities.map(ability => (
                        <li key={ability.pokemon_v2_ability.id}>
                        {`${ability.pokemon_v2_ability.name} (ID: ${ability.pokemon_v2_ability.id})`}
                        </li>
                    ))}
                    </ul>
                </ul>
                </li>
            ))}
            </ul>
            <h3>Tipo de Pokémon (ID: {typeInfo.pokemon_v2_type.id}): {typeInfo.pokemon_v2_type.name}</h3>
        </div>
    );

}

export default PokeListContainer;
