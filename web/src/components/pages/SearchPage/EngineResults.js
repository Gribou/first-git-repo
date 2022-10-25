import React from "react";
import { Typography } from "@mui/material";
import { Magnify } from "mdi-material-ui";
import ElementButton from "components/misc/elements/ElementButton";
import SingleRowResults from "./SingleRowResults";

export default function EngineResults({ others }) {
  const count = others?.length;
  const max_length = 4;

  const footer = (
    <Typography variant="caption" color="textSecondary" gutterBottom>
      Voir les résultats de votre recherche dans d&apos;autres applications.
    </Typography>
  );

  const element_props = {
    sx: { mr: 1, flex: "0 1 120px", minWidth: "120px" },
  };
  console.log(others);

  return (
    <SingleRowResults title="Autres moteurs de recherche" footer={footer}>
      {others?.slice(0, max_length)?.map(({ name, url, color, textColor }) => (
        <ElementButton
          key={name}
          element={{
            title: name,
            url: url,
            icon: <Magnify />,
            color,
            textColor: textColor,
          }}
          {...element_props}
        />
      ))}
      {count > max_length && (
        <ElementButton element={{ title: "..." }} {...element_props} />
      )}
    </SingleRowResults>
  );
}
