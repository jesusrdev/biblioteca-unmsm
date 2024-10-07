import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function FilterOptions({ categories, editorials, authors, filterOptions, handleChange }) {
  return (
    <div className="flex flex-row *:flex-1 gap-4">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select-category"
          name="category"
          value={filterOptions.category}
          onChange={handleChange}
          label="Categoría"
        >
          <MenuItem value={""}>
            <em>Todas</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.idCategory} key={category.idCategory}>
              {category.nameCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Editorial</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select-editorial"
          name="editorial"
          value={filterOptions.editorial}
          onChange={handleChange}
          label="Editorial"
        >
          <MenuItem value={""}>
            <em>Todas</em>
          </MenuItem>
          {editorials.map((editorial) => (
            <MenuItem value={editorial.idEditorial} key={editorial.idEditorial}>
              {editorial.nameEditorial}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Autor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="select-author"
          name="author"
          value={filterOptions.author}
          onChange={handleChange}
          label="Autor"
        >
          <MenuItem value={""}>
            <em>Todas</em>
          </MenuItem>
          {authors.map((author) => (
            <MenuItem value={author.idAuthor} key={author.idAuthor}>
              {author.nameAuthor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
