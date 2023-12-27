import Nav from "../components/Nav";
import Content from "../components/Content";
import "./../index.scss";

export default function Start() {
  return (
    <div className="h-dvh flex flex-col">
      <Nav />
      <Content />
    </div>
  );
}
