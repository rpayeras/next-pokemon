import { Grid } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";
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
