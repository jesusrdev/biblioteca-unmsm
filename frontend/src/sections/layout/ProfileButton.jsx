import { Box, Button, Menu } from "@mui/material";
import { useState } from "react";
import ButtonLeftBar from "./ButtonLeftBar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ProfileButton({ handleLogout }) {
  const username = sessionStorage.getItem("user");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="flex items-center justify-center text-black">
      {/* <div className="font-bold">{username}</div> */}
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        id="basic-button"
        endIcon={<KeyboardArrowDownIcon />}
        className="font-bold text-black"
      >
        {username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Button onClick={handleLogout} className="mx-2 text-black">
          Cerrar sesión
        </Button>
        {/* {items.map((item, index) => (
          <MenuItem onClick={handleClose} className="p-0" key={index}>
            <Link
              href={item.url}
              className="w-full py-1.5 px-4 font-medium no-underline text-custom-gray"
            >
              {item.text}
            </Link>
          </MenuItem>
        ))} */}
      </Menu>
    </Box>
  );
}
