import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Navbar } from '../ui'

interface PropsLayout {
  children: React.ReactNode
  title?: string
}

const origin = typeof window === 'undefined' ? '' : window.location.origin

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

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta en la página sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar></Navbar>
      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  )
}
