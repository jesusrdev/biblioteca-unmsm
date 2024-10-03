import CustomCard from "@/components/Card";
import CardBook from "@/sections/books/CardBook";

const books = [
  {
    title: "El libro de la vida",
    image:
      "https://play-lh.googleusercontent.com/8MvRCyvLCqUIuXZcSs4k1rXfwIkDtFeQOjbowBvKCKey0KCy9FlidP6WcQVg50WskQJb4g",
    author: {
      name: "Carlos Fuentes",
    },
  },
  {
    title: "El libro de la vida",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD40YKDr0JEKMyMhxoftS3gbXaAtszj_O5A&s",
    author: {
      name: "Carlos Fuentes",
    },
  },
  {
    title: "La vida es un libro",
    image:
      "https://www.sancristoballibros.com/imagenes/9789972/978997233516.GIF",
    author: {
      name: "Carmen Fuentes",
    },
  },
  {
    title: "El libro de la vida",
    image:
      "https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_010118/tienda_010118_8b6ec482638a397f49146caaa8a8c02f945ab468_producto_large_90.jpg?not-from-cache-please",
    author: {
      name: "Carlos Fuentes",
    },
  },
];

export default function Home() {
  return (
    <div className="w-full p-8">
      <h1 className="my-20 text-5xl font-bold text-center">
        Proyecto Biblioteca UNMSM
      </h1>
      <CustomCard className="px-5 pb-7">
        <p className="my-0 mb-4 text-lg font-semibold font-montserrat">
          Lo más leído:
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {books.map((book, index) => (
            <CardBook key={index} book={book} />
          ))}
        </div>
      </CustomCard>
    </div>
  );
}
