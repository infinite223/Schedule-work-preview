import React from "react";
import Nav from "../components/Nav";
import Content from "../components/Content";
import Background from "../components/Background";
import "./../index.scss";

export default function Start() {
  return (
    <div className="App" style={{position: "relative"}}>
      <Nav />
      <Content />
      {/* <Background/> */}
    </div>
  );
}
