import { useEffect, useState } from 'react';

import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavoritesPage = () => {

  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);
  
  useEffect(() => {
    setFavoritesPokemons( localFavorites.pokemons() )
  }, [])

  return (
    <Layout title="Favorites Page">
      {
        favoritesPokemons.length === 0
        ? <NoFavorites />
        : <FavoritePokemons pokemons={ favoritesPokemons } />
      }
     
    </Layout>
  )
}

export default FavoritesPage