import React from "react";
import Head from "next/head";

const makeTitle = (title: string, name: string) =>
  title === name ? title : `${title} – ${name}`;

interface MetaDecoratorProps {
  name?: string;
  title?: string;
  description: string;
  image?: string;
  color?: string;
  manifest?: string;
  children?: React.ReactNode;
}

const MetaDecorator: React.FC<MetaDecoratorProps> = ({
  name = "100 Seconds of Code", // site name
  title = "100 Seconds of Code", // page title
  description,
  image,
  color = "#1f2028",
  manifest = "/manifest.json",
  children,
}) => (
  <Head>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <meta key="tw_site" name="twitter:site" content="@dhrumangupta" />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />

    {description && (
      <React.Fragment>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </React.Fragment>
    )}

    {image && (
      <React.Fragment>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </React.Fragment>
    )}

    <meta key="theme_color" name="theme-color" content={color} />
    <meta key="tile_color" name="msapplication-TileColor" content={color} />
    {manifest && <link key="manifest" rel="manifest" href={manifest} />}
    {children}
  </Head>
);

export default MetaDecorator;
