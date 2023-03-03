import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Container, InputField, PokemonContainer, Title } from './styles';
import { PokemonComponent } from './Components/PokemonComponent';
import axios from 'axios';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'increment':
      return {
        number: state.number < 1008 ? state.number + 1 : state.number
      }
    case 'decrement':
      return {
        number: state.number > 1 ? state.number - 1 : state.number
      }
    case 'changeValue':
      return {
        number: action.value > 0 && action.value < 1008 ? action.value : state.number
      }
    default:
      throw Error('Ação desconhecida: ' + action.type);
  }
}

const App = () => {
  const [pokemonResponse, setPokemonResponse] = useState<any>()

  const [state, dispatch] = useReducer(reducer, { number: 1 })

  const handleGetPokemon = useCallback(async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${state?.number ?? 1}`)
    console.log(response.data)
    setPokemonResponse(response.data)
  }, [state?.number])

  useEffect(() => {
    handleGetPokemon()
  }, [state?.number])

  return (
    <Container>
      <Title>Pokemon</Title>
      <PokemonContainer>
        <InputField>
          <button onClick={() => dispatch({ type: 'decrement' })}>Anterior</button>
          <input value={state?.number} onChange={(e) => dispatch({ type: 'changeValue', value: +e.currentTarget.value })} />
          <button onClick={() => dispatch({ type: 'increment' })}>Próximo</button>
        </InputField>
        {pokemonResponse ? (
          <PokemonComponent pokemonResponse={pokemonResponse} />
        ) : (
          <p>Carregando...</p>
        )}
      </PokemonContainer>
    </Container>
  )
}

export default App
