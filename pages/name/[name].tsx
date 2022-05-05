import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PokemonDetail as IPokemonDetail } from "../../interfaces";
import { ParsedUrlQuery } from "querystring";

import { PokemonDetail } from "../../components/pokemon/PokemonDetail";
import pokeApi, { getPokemonInfo } from "../../api/pokeApi";

interface Props {
  pokemon: IPokemonDetail;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <>
      <PokemonDetail pokemon={pokemon} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get(`/pokemon?limit=151`);

  const authPaths = data.results.map((value: IPokemonDetail, idx: number) => {
    const { name } = value;

    return {
      params: {
        name: name,
      },
    };
  });

  return {
    paths: authPaths,
    fallback: "blocking",
  };
};

interface IParams extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as IParams;
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
