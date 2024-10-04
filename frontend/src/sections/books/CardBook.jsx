import CustomCard from "@/components/Card";
import { Button, CardContent } from "@mui/material";
import CustomCardMedia from "../book/CustomCardMedia";

export default function CardBook({ book }) {
  return (
    <Button className="h-full p-0 m-auto w-fit">
      <CustomCard className="h-full px-0 py-0 m-0 max-w-44">
        <CustomCardMedia
          image={`${process.env.NEXT_PUBLIC_API_URL}${book.imageUrl}`}
        />
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
            {book.author?.name}
          </p>
        </CardContent>
      </CustomCard>
    </Button>
  );
}
