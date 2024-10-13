"use client";

import { useRouter } from "next/navigation";
import CustomCard from "./Card";
import { Button, IconButton } from "@mui/material";
import LeftArrowIcon from "@mui/icons-material/ArrowBack";

export default function ButtonToBack() {
  const router = useRouter();

  return (
    <CustomCard className="w-full">
      <Button
        onClick={() => router.back()}
        variant="text"
        color="primary"
        startIcon={<LeftArrowIcon />}
        className="text-custom-gray"
      >
        Volver atrás
      </Button>
    </CustomCard>
  );
}
