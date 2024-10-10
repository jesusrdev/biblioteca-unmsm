import ButtonToBack from "@/components/ButtonToBack";
import BookDetail from "@/sections/book-detail/BookDetail";

export default function BookDetailPage({ params: { id } }) {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center ">Detalle de libro</h1>
      <ButtonToBack />
      <BookDetail id={id} />
    </main>
  );
}
