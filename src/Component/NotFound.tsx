import React from "react";
import { useHistory } from "react-router-dom";

export default function NotFound(): JSX.Element {
  const history = useHistory();
  console.log(history.location);

  return <h1>404 not found</h1>;
}
