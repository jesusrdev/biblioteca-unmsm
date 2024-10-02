import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput() {
  return (
    <Paper className="px-3 rounded-md shadow-none bg-search-input">
      <IconButton type="button" className="p-1 m-1" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase placeholder="Busca tu libro..." className="*:placeholder:italic text-base font-medium *:placeholder:font-normal" />
    </Paper>
  )
}
