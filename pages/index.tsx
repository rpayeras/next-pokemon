import { Grid } from "@nextui-org/react";
import type { NextPage } from "next";
import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { pokeApi } from "../api";

import { PokemonListResponse, SmallPokemon } from "../interfaces";
interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <Layout title="Home" description="Home of Pokemon App">
        <Grid.Container gap={2} justify="flex-start">
          {!!pokemons &&
            pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </Grid.Container>
      </Layout>
    </>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const results = data.results.map((item, idx) => {
    const id = idx + 1;
    return {
      ...item,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  });

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  return {
    props: {
      pokemons: results,
    },
  };
};

export default Home;
