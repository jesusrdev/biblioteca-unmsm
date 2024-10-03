import CustomCard from "@/components/Card";
import { Button, CardContent, CardHeader } from "@mui/material";
import React from "react";

export default function CardBook({ book }) {
  return (
    <Button className="h-full p-0 m-auto w-fit">
      <CustomCard className="h-full px-0 py-0 m-0">
        <div className="p-5 bg-orange-400">
          <img
            src={book.image}
            alt="book"
            className=" h-44 border-[4px] border-white border-solid [box-shadow:7px_7px_6px_1px_rgba(0,0,0,0.25)]"
            // width={200}
            // height={300}
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
