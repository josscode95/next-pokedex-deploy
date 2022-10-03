import { Grid, Card, Button, Container, Text, Image } from "@nextui-org/react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { Layout } from "../../components/layouts";
import { PokemonFull, PokemonResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import conffetti from 'canvas-confetti'
import { pokeApi } from "../../api";

interface PokemonByNamePageI {
  pokemon: PokemonFull;
}

const PokemonByNamePage: NextPage<PokemonByNamePageI> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites( pokemon.id ))

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite( pokemon.id )
    setIsInFavorites( !isInFavorites )
    if( isInFavorites ) return;
    conffetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {isInFavorites ? 'En favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>

  )
}

export const getStaticPaths:GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151')
  const pokes:string[] = data.results.map(({ name }) => name)
  return {
    paths: pokes.map(name => ({
      params: { name }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name:string };
  return {
    props: {
      pokemon: await getPokemonInfo( name )
    }
  }
}

export default PokemonByNamePage;