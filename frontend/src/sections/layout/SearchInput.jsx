import { IconButton, InputBase, Paper } from "@mui/material";
import Image from "next/image";

export default function SearchInput() {
  return (
    <Paper className="px-3 rounded-md shadow-none bg-search-input">
      <IconButton type="button" className="p-[2px] m-[2px] mr-1" aria-label="search">
        <Image src="/icons/search.svg" alt="search" width={28} height={28} />
      </IconButton>
      <InputBase
        placeholder="Busca tu libro..."
        className="*:placeholder:italic text-base font-medium *:placeholder:font-normal"
      />
    </Paper>
  );
}
