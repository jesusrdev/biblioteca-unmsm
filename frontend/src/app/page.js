import { books, categories } from "@/example-data";
import Categories from "@/sections/books/Categories";
import CarouselBooks from "@/sections/books/CarouselBooks";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="sm:w-[calc(100%-260px)] w-full p-8">
      <h1 className="my-20 text-5xl font-bold text-center">
        Proyecto Biblioteca UNMSM
      </h1>
      <CarouselBooks
        text="Lo más leído"
        book={books}
      />
      <Categories categories={categories} />
    </div>
  );
}
