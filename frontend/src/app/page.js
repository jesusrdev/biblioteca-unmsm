import Categories from "@/sections/home/Categories";
import PopularBooks from "@/sections/home/PopularBooks";

export default function Home() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Proyecto Biblioteca UNMSM
      </h1>
      <PopularBooks />
      <Categories />
    </main>
  );
}
