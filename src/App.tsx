import React, { useEffect, useReducer, useState } from 'react'
import { Container, InputField, PokemonContainer, Title } from './styles';
import { PokemonComponent } from './Components/PokemonComponent';

const reducer = (state: any, action: any) => {
  if (action.type === 'increment') {
    return {
      number: state.number + 1
    }
  } else if (action.type === 'decrement') {
    return {
      number: state.number > 1 ? state.number - 1 : state.number
    }
  }
}

const App = () => {
  const [pokemonResponse, setPokemonResponse] = useState<any>()

  const [state, dispatch] = useReducer(reducer, { number: 1 })

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${state?.number ?? 1}`).then(response => {
      response.json().then((data) => {
        console.log(data)
        setPokemonResponse(data)
      })
    })
  }, [state?.number])


  return (
    <Container>
      <Title>Pokemon</Title>
      <PokemonContainer>
        <InputField>
          <button onClick={() => dispatch({ type: 'decrement' })}>Anterior</button>
          <h2>{state?.number}</h2>
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

export default App;
