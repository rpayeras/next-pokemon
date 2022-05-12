import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { Layout } from "../layouts/Layout";

import { PokemonDetail as IPokemonDetail } from "../../interfaces";

import { existsInFavourites, toggleFavourite } from "../../utils";

import confetti from "canvas-confetti";

interface Props {
  pokemon: IPokemonDetail;
}

export const PokemonDetail = ({ pokemon }: Props) => {
  const { id, name, sprites } = pokemon;

  const [isFav, setIsFav] = useState(existsInFavourites(id));

  const onToggleFavourite = () => {
    toggleFavourite(id);
    setIsFav(!isFav);

    if (!isFav) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={`${name}`}>
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
              css={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button
                ghost={isFav}
                color="gradient"
                onClick={onToggleFavourite}
              >
                {isFav ? "Remove from favourites" : "Save on favourites"}
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
