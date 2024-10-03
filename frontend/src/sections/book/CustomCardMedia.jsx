"use client";

import { useEffect, useState } from "react";
import { usePalette } from "color-thief-react";
import clsx from "clsx";

export default function CustomCardMedia({ image, className }) {
  const style = clsx("p-5 h-56", className);

  const [colors, setColors] = useState(["#ffffff", "#ff9900", "#ffffff"]);
  const { data: color } = usePalette(image, 3, "hex", {
    crossOrigin: "anonymous",
    quality: 1,
  });

  useEffect(() => {
    if (color) {
      setColors(color);
    }
  }, [color]);

  return (
    <div
      className={style}
      style={{
        background: `linear-gradient(0deg, ${colors[1]} 0%, white 130%)`,
      }}
    >
      <img
        src={image}
        alt="book"
        className="h-full border-[4px] border-white border-solid [box-shadow:7px_7px_6px_1px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}
