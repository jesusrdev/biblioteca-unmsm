"use client";
import CardBook from "@/sections/book/CardBook";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselComponent({ books }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1000 },
      items: 4,
    },
    desktopLarge: {
      breakpoint: { max: 1000, min: 750 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 750, min: 600 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 600, min: 450 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 450, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      containerClass="carousel-container"
      className="px-8 pb-7"
      itemClass=""
    >
      {books.map((book, index) => (
        <CardBook key={index} book={book} />
      ))}
    </Carousel>
  );
}
