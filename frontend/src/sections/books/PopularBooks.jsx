import CarouselBooks from "./CarouselBooks";
import { books } from "@/example-data";

export default function PopularBooks() {
  return (
    <CarouselBooks
      text="Lo más leído"
      book={books}
      urlGet={`${process.env.NEXT_PUBLIC_API_URL}/api/books`}
    />
  );
}
