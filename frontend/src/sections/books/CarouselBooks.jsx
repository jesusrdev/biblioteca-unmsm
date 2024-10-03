import CustomCard from "@/components/Card";
import CarouselComponent from "@/components/Carousel";
import { books } from "@/example-data";
import { Box } from "@mui/material";

export default function CarouselBooks({ text, button, urlGet, ...props }) {
  // Get the books from the API filtered by the category

  return (
    <CustomCard className="px-0 pb-0 my-10" {...props}>
      <Box className="flex justify-between items-center px-8 mb-4">
        <p className="my-0 text-lg font-semibold font-montserrat">
          {text}:
        </p>
        {button}
      </Box>
      <CarouselComponent books={books} />
    </CustomCard>
  );
}
