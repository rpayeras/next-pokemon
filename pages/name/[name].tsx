import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PokemonDetail as IPokemonDetail } from "../../interfaces";
import { ParsedUrlQuery } from "querystring";

import { PokemonDetail } from "../../components/pokemon/PokemonDetail";
import pokeApi from "../../api/pokeApi";

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

  console.log(data);

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
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name: paramName } = params as IParams;
  const { data } = await pokeApi.get<IPokemonDetail>(`/pokemon/${paramName}`);

  const { id, name, sprites } = data;

  return {
    props: {
      pokemon: {
        id,
        name,
        sprites,
      },
    },
  };
};

export default PokemonByNamePage;
