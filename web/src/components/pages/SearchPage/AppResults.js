import React from "react";
import ElementMiniCard from "components/misc/elements/ElementMiniCard";
import SingleRowResults from "./SingleRowResults";

export default function AppResults({ apps }) {
  const max_count = 8;
  return (
    <SingleRowResults title="Applications">
      {apps?.slice(0, max_count)?.map((element, i) => (
        <ElementMiniCard element={element} key={i} />
      ))}
    </SingleRowResults>
  );
}
