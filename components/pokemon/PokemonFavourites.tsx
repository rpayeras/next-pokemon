import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { PokemonFavourite } from "./";

interface Props {
  ids: number[];
}

export const PokemonFavourites: FC<Props> = ({ ids }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {ids.map((id) => (
        <PokemonFavourite key={id} id={id} />
      ))}
    </Grid.Container>
  );
};
