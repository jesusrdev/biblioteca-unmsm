import CardBook from "../book/CardBook";

export default function BooksContainer({ books }) {
  if (books.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl font-bold text-center">No hay libros</p>
        <p className="text-sm text-center">
          Intenta cambiar los filtros o busca otra categoría
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-5 my-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <CardBook key={book.idBook} book={book} />
      ))}
    </div>
  );
}
