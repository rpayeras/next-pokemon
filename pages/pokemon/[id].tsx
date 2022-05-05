import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import { PokemonDetail as IPokemonDetail } from "../../interfaces";
import { ParsedUrlQuery } from "querystring";

import { PokemonDetail } from "../../components/pokemon/PokemonDetail";

import pokeApi from "../../api/pokeApi";
interface Props {
  pokemon: IPokemonDetail;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  // const router = useRouter();
  // console.log(router.query);

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
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const { data } = await pokeApi.get<IPokemonDetail>(`/pokemon/${id}`);
  const { name, sprites } = data;

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

export default Pokemon;
