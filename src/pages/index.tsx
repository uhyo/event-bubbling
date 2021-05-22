import { Contents } from "../components/Contents";
import { Game } from "../components/Game";

export default function Home() {
  return (
    <Contents level={1}>
      <Game level={1} />
    </Contents>
  );
}
