import Head from 'next/head'
import { FC } from 'react'
import { Navbar } from '../ui'

interface PropsLayout {
  children: React.ReactNode
  title?: string
}

export const Layout: FC<PropsLayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name="author" content="Nahuel Caceres" />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar></Navbar>
      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  )
}
