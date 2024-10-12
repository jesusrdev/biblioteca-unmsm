"use client";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("query") || "");
  const router = useRouter();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/books?query=${value}`);
  };

  return (
    <Paper className="px-3 rounded-md shadow-none bg-search-input">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex" }}
        onSubmit={handleSubmit}
      >
        <IconButton
          type="button"
          className="p-[2px] m-[2px] mr-1"
          aria-label="search"
        >
          <Image
            src="/icons/search.svg"
            alt="search"
            width={28}
            height={28}
            priority
          />
        </IconButton>
        <InputBase
          placeholder="Busca tu libro..."
          name="query"
          type="text"
          value={value}
          onChange={handleChange}
          className="*:placeholder:italic text-base font-medium *:placeholder:font-normal"
        />
      </Box>
    </Paper>
  );
}
