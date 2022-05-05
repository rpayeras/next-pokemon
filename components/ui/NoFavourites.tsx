import { Container, Image, Spacer, Text } from "@nextui-org/react";

export const NoFavourites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
      }}
    >
      <Text h1>Not favourites here</Text>
      <Spacer />
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/122.svg"
        width={250}
        height={250}
        css={{
          opacity: 0.1,
        }}
        alt="Img not found"
      />
    </Container>
  );
};
