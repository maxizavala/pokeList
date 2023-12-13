import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

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

    const [pokemonWithImages, setPokemonWithImages] = useState([]);

    useEffect(() => {
        const fetchPokemonImages = async () => {
            try {
                const pokemonData = data?.pokemon_v2_pokemon || [];
                const updatedPokemon = await Promise.all(
                pokemonData.map(async pokemon => {
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                    return {
                    ...pokemon,
                    imageUrl,
                    };
                })
                );
                setPokemonWithImages(updatedPokemon);
            } catch (error) {
                console.error('Error fetching Pokemon images', error);
            }
        };

        fetchPokemonImages();
    }, [data]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const typeInfo = data.pokemon_v2_pokemontypepast_by_pk;

    return (
        <div>
            <ul>
                {pokemonWithImages.map(pokemon => (
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
                    <img src={pokemon.imageUrl} alt={`${pokemon.name} Image`} />
                </li>
                ))}
            </ul>
            <h3>Tipo de Pokémon (ID: {typeInfo.pokemon_v2_type.id}): {typeInfo.pokemon_v2_type.name}</h3>
        </div>
    );
}

export default PokeListContainer;
