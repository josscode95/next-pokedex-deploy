import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { Pokemon } from "../../interfaces"
import { PokemonCard } from "./PokemonCard";

interface PokemonContainerI {
  pokemons:Pokemon[];
}

export const PokemonContainer:FC<PokemonContainerI> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
      {
        pokemons.map((pokemon) => (
          <PokemonCard pokemon={ pokemon } key={ pokemon.id } />
        ))
      }
    </Grid.Container>
  )
}



