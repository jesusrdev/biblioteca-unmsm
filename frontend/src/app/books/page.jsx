import FilterBooks from "@/sections/books/FilterBooks";

export default function BooksPage() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center ">
        Administrar libros
      </h1>
      <FilterBooks />
    </main>
  );
}