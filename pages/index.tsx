import type { NextPage, GetStaticProps } from 'next'

import { pokeApi } from '../api'
import { Layout } from '../components/layouts';
import { Pokemon, PokemonResponse } from '../interfaces';
import { PokemonContainer } from '../components/pokemon';

interface Props {
  pokemons:Pokemon[];
}

const HomePage:NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title="Listado de Pokemons">
      <PokemonContainer pokemons={ pokemons } />
    </Layout>
  )
}

export const getStaticProps:GetStaticProps = async(ctx) => {

  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151')

  const pokes:Pokemon[] = []

  data.results.map((poke, index) => (
    pokes.push({
      name: poke.name,
      url: poke.url,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
    })
  ))

  return {
    props: {
      pokemons: pokes
    }
  }
}

export default HomePage
