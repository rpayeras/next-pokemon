import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import { ParsedUrlQuery } from "querystring";

import { PokemonDetail } from "../../components/pokemon/PokemonDetail";
import { PokemonDetail as IPokemonDetail } from "../../interfaces";

import pokeApi, { getPokemonInfo } from "../../api/pokeApi";
interface Props {
  pokemon: IPokemonDetail;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  return (
    <>
      <PokemonDetail pokemon={pokemon} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const authPaths = [...Array(150)].map((value, idx) => {
    return {
      params: {
        id: String(idx + 1),
      },
    };
  });

  return {
    paths: authPaths,
    // fallback: false,
    fallback: "blocking",
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const pokemon = await getPokemonInfo(id);

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

export default Pokemon;
