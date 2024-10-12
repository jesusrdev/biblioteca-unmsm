import CustomCard from "@/components/Card";

export default function BookInfo({ book }) {
  return (
    <CustomCard className="w-full md:col-span-3 px-8 py-5">
      <div className="text-3xl font-bold font-inter uppercase">
        {book.title}
      </div>
      <p className="text-base">
        <span className="font-bold">Autor: </span>
        {book.author?.nameAuthor}
      </p>
      <p className="text-base">
        <span className="font-bold">Editorial: </span>
        {book.editorial?.nameEditorial}
      </p>
      <p className="text-base">
        <span className="font-bold">Categoría: </span>
        {book.category?.nameCategory}
      </p>
      <p className="text-base">
        <span className="font-bold">ISBN: </span>
        {book.isbn}
      </p>
      <p className="text-base">
        <span className="font-bold">Fecha de publicación: </span>
        {book.publicationDate}
      </p>
      <p className="text-base">
        <span className="font-bold">Número de páginas: </span>
        {book.numberOfPage}
      </p>
      <p className="text-base">
        <span className="font-bold">Idioma: </span>
        {book.language}
      </p>
      <p className="text-base">
        <span className="font-bold">Descripción: </span>
        {book.description}
      </p>
    </CustomCard>
  );
}
