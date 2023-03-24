
const toggleFavorite = (id:number) => {

    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    
    if (favorites.includes(id)){
        favorites = favorites.filter( pokeId => pokeId !== id)
    } else {
        favorites.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id:number): boolean => {
    // logica por si la funcion es llamada desde el contexto del backend (node)
    if ( typeof window === 'undefined' ) return false
    
    const favorites:number[] = JSON.parse(localStorage.getItem('favorites') || '[]')

    return favorites.includes( id )
}

const pokemons = ():number[] => {
    return JSON.parse( localStorage.getItem('favorites') || '[]')
}

export default{
    existInFavorites: existInFavorites,
    toggleFavorite: toggleFavorite,
    pokemons: pokemons,
}