import React from "react";
import { useSelector } from "react-redux";
import { selectCount } from "./tableSlice";

export function Table() {
  const count = useSelector(selectCount);

  return (
    <div>
      <p>The main table component will go here.</p>
      <p>(Debug: {count})</p>
    </div>
  );
}
