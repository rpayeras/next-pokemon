import { FC } from "react";

import Head from "next/head";

import { Navbar } from "../ui";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children: JSX.Element;
}

export const Layout: FC<Props> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>Pokemon App</title>
        <meta name="title" content={title || "Pokeapp"} />
        <meta name="author" content="Roberto Payeras" />
        <meta
          name="description"
          content={description || "This is a pokemon app"}
        />
        <meta name="keywords" content={keywords} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
