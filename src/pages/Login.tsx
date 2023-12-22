import React from "react";
import "./../styles/loginStyles.scss";
import {} from "react-router-dom";
import {BackButton} from "../components/BackButton";

export default function Login() {
  return (
    <div className="login">
      <BackButton />
      dada
      <a href={`/`}>back</a>
      Login page
    </div>
  );
}
