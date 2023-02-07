import Head from "next/head";

export default function HeadTag(){
    return (
      <Head>
        <title>BeniBul</title>
        <meta lang="tr" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
    );
}
