import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "../../components/layouts/Layout";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import pokeApi from "../../api/pokeApi";
import { SmallPokemon, PokemonDetail } from "../../interfaces";
import { ParsedUrlQuery } from "querystring";

interface Props {
  pokemon: PokemonDetail;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  // const router = useRouter();
  // console.log(router.query);

  const { name, sprites } = pokemon;

  return (
    <Layout title="">
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={sprites.other?.dream_world.front_default || "no-image.png"}
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1>{name}</Text>
              <Button color="gradient" ghost>
                Save on fav
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
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

  console.log(authPaths);

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
  const { data } = await pokeApi.get<PokemonDetail>(`/pokemon/${id}`);

  //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg
  return {
    props: {
      pokemon: data,
    },
  };
};

export default Pokemon;
