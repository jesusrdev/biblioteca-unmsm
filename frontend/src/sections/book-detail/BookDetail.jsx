"use client";

import { getBookById } from "@/api/bookapi";
import CustomCard from "@/components/Card";
import { useEffect, useState } from "react";
import CustomCardMedia from "../book/CustomCardMedia";

export default function BookDetail({ id }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await getBookById(id, "detailed");
      setBook(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
      <CustomCard className="w-full ">
        <CustomCardMedia
          image={`${process.env.NEXT_PUBLIC_API_URL}${book?.imageUrl}`}
        />
      </CustomCard>
      <CustomCard className="w-full md:col-span-3">
        Info
      </CustomCard>
      <CustomCard className="w-full col-span-full">
        Ejemplares
      </CustomCard>
    </div>
  )
}
