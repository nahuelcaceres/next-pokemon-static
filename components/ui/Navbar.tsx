import { Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0x 20px',
        backgroundColor: theme?.colors.gray300.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono de la app"
        width={70}
        height={70}
      />
      {/* <NextLink href="/" passHref> */}
      <Link href="/">
        <Text css={{ display: 'inline-flex' }} color="white" h2>
          P
        </Text>
        <Text css={{ display: 'inline-flex' }} color="white" h3>
          ókemon
        </Text>
      </Link>
      {/* </NextLink> */}

      <Spacer css={{ flex: 1 }} />

      <Link
        href="/favorites"
        style={{ marginRight: '10px', marginTop: '12px' }}
      >
        <Text color="white" h3>
          Favoritos
        </Text>
      </Link>
    </div>
  )
}
