"use client";
import CustomCard from "@/components/Card";
import { Button, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { usePalette } from 'color-thief-react';

export default function CardBook({ book }) {
  const [colors, setColors] = useState(["#ffffff", "#ff3300", "#ffffff"]);
  const { data: color, loading, error } = usePalette(book.image, 3, 'hex', { crossOrigin: 'anonymous', quality: 1 });

  useEffect(() => {
    if (color) {
      setColors(color);
    }
  }, [color]);

  return (
    <Button className="h-full p-0 m-auto w-fit">
      <CustomCard className="h-full px-0 py-0 m-0">
        <div
          className="p-5"
          style={{
            background: `linear-gradient(45deg, ${colors[1]} 0%, white 130%)`,
          }}
        >
          <img
            src={book.image}
            alt="book"
            className="h-44 border-[4px] border-white border-solid [box-shadow:7px_7px_6px_1px_rgba(0,0,0,0.25)]"
          />
        </div>
        <CardContent
          sx={{
            textTransform: "none",
            padding: "0px",
          }}
          className="p-1 px-2"
        >
          <p className="m-1 text-sm font-semibold uppercase font-inter">
            {book.title}
          </p>
          <p className="m-1 text-xs font-medium font-inter">
            {book.author.name}
          </p>
        </CardContent>
      </CustomCard>
    </Button>
  );
}
