import { GetStaticProps } from "next";
import { Contents } from "../../components/Contents";
import { Game } from "../../components/Game";
import { levelNumber } from "../../logic/constants";

export async function getStaticPaths() {
  const paths = [];
  for (let i = 1; i <= levelNumber; i++) {
    paths.push({
      params: {
        level: String(i),
      },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

type PageProps = {
  level: number;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  return {
    props: {
      level: Number(params?.level || 1),
    },
  };
};

export default function LevelPage({ level }: PageProps) {
  return (
    <Contents level={level}>
      <Game level={level} />
    </Contents>
  );
}
