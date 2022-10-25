import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Magnify, Close } from "mdi-material-ui";
import { useCurrentProfile } from "features/profile";
import { ROUTES } from "routes";

function useSearch() {
  const navigate = useNavigate();
  const { search } = useParams();
  const { current_profile } = useCurrentProfile();
  const [keyword, setKeyword] = useState(search || "");

  useEffect(() => {
    //update field value when location changes (ex : filters are cleared)
    setKeyword(search || "");
  }, [search]);

  const handleSearchRequest = () => {
    if (keyword) {
      navigate(
        ROUTES.search_in_profile.path
          .replace(":profile", current_profile?.url)
          ?.replace(":search", keyword)
      );
    } else {
      navigate(ROUTES.profile.path.replace(":profile", current_profile?.url));
    }
  };

  const clear = () => {
    setKeyword("");
  };

  return { keyword, setKeyword, clear, onSearched: handleSearchRequest };
}

export default function SearchField({ placeholder = "Recherche…", ...props }) {
  const { keyword, setKeyword, clear, onSearched } = useSearch();

  const handleBlur = () => {
    setKeyword((v) => v.trim());
  };

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.charCode === 13 || e.key === "Enter") {
      onSearched(keyword);
    } else if (e.charCode === 27 || e.key === "Escape") {
      clear();
    }
  };

  return (
    <Input
      placeholder={placeholder}
      sx={{
        color: "inherit",
        height: "2.5em",
        "& .MuiInput-input": {
          p: 1,
          pl: {
            xs: "1em",
            sm: 2,
          },
          width: { xs: "100%", md: "20ch" },
          transition: (theme) => theme.transitions.create("width"),
        },
      }}
      autoComplete="off"
      inputProps={{ "aria-label": "search" }}
      onBlur={handleBlur}
      onChange={handleInput}
      onKeyUp={handleKeyUp}
      value={keyword || ""}
      disableUnderline
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => onSearched(keyword)}
            size="small"
            color="inherit"
          >
            <Magnify />
          </IconButton>
          {keyword && (
            <IconButton onClick={clear} size="small" color="inherit">
              <Close />
            </IconButton>
          )}
        </InputAdornment>
      }
      fullWidth
      {...props}
    />
  );
}
