"use client";
import CardBook from "@/sections/books/CardBook";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselComponent({ books }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1000, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 340, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      containerClass="carousel-container"
      className="pb-7 px-8"
      itemClass=""
    >
      {books.map((book, index) => (
        <CardBook key={index} book={book} />
      ))}
    </Carousel>
  );
}
