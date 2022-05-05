import { Spacer, Text, useTheme, Link as LinkUI } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Link href="/">
        <LinkUI css={{ alignItems: "center" }}>
          <Image
            width={75}
            height={75}
            alt={"App icon"}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </LinkUI>
      </Link>

      <Spacer css={{ flex: 1 }} />
      <Link href="/favourites">
        <LinkUI css={{ marginRight: "10px" }}>
          <Text>Favourites</Text>
        </LinkUI>
      </Link>
    </div>
  );
};
