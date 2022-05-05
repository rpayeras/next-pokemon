import { Grid, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import { PokemonFavourites } from "../../components/pokemon/PokemonFavourites";
import { NoFavourites } from "../../components/ui/NoFavourites";
import { getFavourites } from "../../utils";

const FavouritesPage = () => {
  const [favs, setFavs] = useState<number[]>([]);

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  return (
    <Layout title="Favourites">
      {favs.length === 0 ? <NoFavourites /> : <PokemonFavourites ids={favs} />}
    </Layout>
  );
};

export default FavouritesPage;
