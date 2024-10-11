import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ButtonLeftBar from "./ButtonLeftBar";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const items = [
  { text: "Mantener libros", url: "/admin/books" },
  { text: "Mantener ejemplares", url: "/admin/copybooks" },
  { text: "Mantener categorías", url: "/admin/categories" },
  { text: "Mantener editoriales", url: "/admin/editorials" },
  { text: "Mantener autores", url: "/admin/authors" },
  { text: "Mantener préstamos", url: "/admin/loans" },
  { text: "Mantener usuarios", url: "/admin/users" },
];

export default function MenuAdmin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full">
      <ButtonLeftBar
        className="w-full"
        text="Admin"
        imageSrc="/icons/admin.svg"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        id="basic-button"
        endIcon={<KeyboardArrowDownIcon />}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item, index) => (
          <MenuItem onClick={handleClose} className="p-0" key={index}>
            <Link
              href={item.url}
              className="w-full py-1.5 px-4 font-medium no-underline text-custom-gray"
            >
              {item.text}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
