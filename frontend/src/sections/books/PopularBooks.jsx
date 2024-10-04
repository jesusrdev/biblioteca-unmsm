import CarouselBooks from "./CarouselBooks";

export default function PopularBooks() {
  return (
    <CarouselBooks
      text="Lo más leído"
      urlGet={`${process.env.NEXT_PUBLIC_API_URL}/api/books`}
    />
  );
}
