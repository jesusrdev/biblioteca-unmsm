import ButtonToBack from "@/components/ButtonToBack";
import BookDetail from "@/sections/book-detail/BookDetail";

export default function BookDetailPage({ params: { id } }) {
  return (
    <main className="w-full p-8">
      <ButtonToBack />
      <BookDetail id={id} />
    </main>
  );
}
