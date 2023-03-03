import React from 'react'
import { PokemonSection, PokemonDetails } from './styles';

export const PokemonComponent = ({ pokemonResponse }: any) => {
  return (
    <PokemonSection>
      <img width={350} height={400} alt={`Sprite ${pokemonResponse.name}`} src={pokemonResponse?.sprites?.front_default} />

      <PokemonDetails>
        <p>{pokemonResponse.name}</p>
        <p>{pokemonResponse.abilities?.map((each: { ability: { name: string; }; }) => each.ability?.name).join(', ')}</p>
        <p>{pokemonResponse.types?.map((each: { type: { name: string; }; }) => each.type.name).join(', ')}</p>
      </PokemonDetails>
    </PokemonSection>
  )
}
