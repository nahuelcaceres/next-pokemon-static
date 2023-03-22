import { Card, Grid, Row, Text } from '@nextui-org/react'
import { GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonCard } from '../components/pokemon'
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

/*
 getStaticProps solo se ejecuta del lado del servidor Y lo hace
 en el momento del Buildtime. En modo de desarrollo se ejecuta
 en cada request por un tema de comodidad para el developer.
 Es una funcion que solo esta disponible en las "pages"
 */
export const getStaticProps: GetStaticProps = async (ctx) => {
  // console.log(
  //   'Solo se verá en el servidor y al momento del build (o en modo develop en cada request'
  // )

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=100')

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }))

  return {
    props: {
      pokemons: pokemons,
    },
  }
}

export default HomePage
