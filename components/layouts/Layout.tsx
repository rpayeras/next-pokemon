import { FC } from "react";

import Head from "next/head";

import { Navbar } from "../ui";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children: JSX.Element;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

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
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={`Detailed info about ${title}`}
        />
        <meta property="og:image" content={`${origin}/share.png`} />
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
