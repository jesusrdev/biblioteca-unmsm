import Categories from "@/sections/books/Categories";
import PopularBooks from "@/sections/books/PopularBooks";

export default function Home() {
  return (
    <main className="w-full p-8">
      <h1 className="my-20 text-5xl font-bold text-center">
        Proyecto Biblioteca UNMSM
      </h1>
      <PopularBooks />
      <Categories />
    </main>
  );
}
