import { Grid } from '@nextui-org/react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon'

interface FavoritePokemonsI {
  pokemons:number[]
}

export const FavoritePokemons = ({ pokemons }:FavoritePokemonsI) => {
  return (
    <Grid.Container gap={ 2 } direction='row' justify='flex-start'>
      {
        pokemons.map(id => (
          <FavoriteCardPokemon key={ id } pokemonId={ id } />
        ))
      }
    </Grid.Container>
  )
}
