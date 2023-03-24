import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  )

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        origin: {
          x: 1,
          y: 0,
        },
      })
    }
  }

  /* 
    Aqui el codigo que se ejecute por fuera de una funcion, se ejecuta del lado del servidor (node)
    por ello cosas como "localStorage.getItem('favorites') nos el error de objeto indefinido."
  */

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image.png'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              <Button
                onClick={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
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

// You should use getStaticPaths if you're statically pre-rendering pages that use dynamic routes
// Executes at build-time.
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons = [...Array(30)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemons.map((id) => ({
      params: { id },
    })),
    fallback: false,
  }
}

// Executes at build-time after GetStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
    revalilate: 86400, //(24 horas en segundos)
  }
}

export default PokemonPage
