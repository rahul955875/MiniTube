"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchQuery } from "@/store/Slices/searchSlice";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, IconButton, Box, Paper } from "@mui/material";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const [input, setInput] = useState(query || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(input.trim()));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        width: "100%",
        p: 1,
        mb : '20px',
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          mx: "auto",
          width: "100%",
          maxWidth: 600,
          borderRadius: 20,
          border : '1px solid ',
          pl: 2,

        }}
      >
        <InputBase
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ flex: 1, fontSize: 14 }}
        />
        <IconButton type="submit" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
