import Head from "next/head";
import Link from "next/link";

type Props = {
  level: number;
  children: React.ReactNode;
};

export const Contents: React.VFC<Props> = ({ level, children }) => {
  return (
    <article>
      <Head>
        <title>Event Bubbling Visualized</title>
        <link rel="canonical" href="https://event-bubbling.vercel.app" />
      </Head>
      <h1>Event Bubbling Visualized</h1>
      <nav>
        <Link href="/">
          <a>Top</a>
        </Link>{" "}
        <a
          href="https://github.com/uhyo/event-bubbling"
          rel="external"
          target="_blank"
        >
          GitHub
        </a>
      </nav>
      <style jsx>
        {`
          h1 {
            text-align: center;
            font-size: 2em;
          }
          nav {
            margin: 0 1em 1em;
            text-align: right;
          }
          a {
            color: #0000ff;
            text-decoration: underline;
          }
        `}
      </style>
      {children}
    </article>
  );
};
