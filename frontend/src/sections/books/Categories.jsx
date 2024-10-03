import CarouselBooks from "./CarouselBooks";
import { Button } from "@mui/material";

export default function Categories({ categories }) {
  return (
    <>
      {categories.map((category, index) => (
        <CarouselBooks
          key={index}
          text={category}
          button={<Button variant="contained">Ver más</Button>}
        />
      ))}
    </>
  );
}
