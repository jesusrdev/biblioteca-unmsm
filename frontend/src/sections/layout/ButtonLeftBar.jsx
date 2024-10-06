import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";

export default function ButtonLeftBar({ className, endIcon, text, imageSrc, ...props }) {
  const style = clsx(
    "items-center transition-colors rounded-full hover:bg-blue-light hover:text-black text-custom-gray",
    className
  );

  return (
    <ListItemButton className={style} {...props}>
      <ListItemIcon className="mx-4 min-w-fit">
        <Image src={imageSrc} alt="icon" width={25} height={25} priority />
      </ListItemIcon>
      <ListItemText primary={text} className="*:font-bold font-montserrat" />
      {endIcon}
    </ListItemButton>
  );
}
