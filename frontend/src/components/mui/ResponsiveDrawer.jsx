"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Suspense, useState } from "react";
import SearchInput from "@/sections/layout/SearchInput";
import ProfileButton from "@/sections/layout/ProfileButton";
import LeftBar from "@/sections/layout/LeftBar";

const drawerWidth = 240;

export default function ResponsiveDrawer({ children, handleLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = <LeftBar handleLogout={handleLogout} />;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="bg-white shadow-none"
      >
        <Toolbar className="justify-between">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
          </IconButton>
          <Suspense>
            <SearchInput />
          </Suspense>
          <ProfileButton handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#fff",
              height: "98%",
              borderRight: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
              borderBottomRightRadius: "30px",
              marginBottom: "20px",
              paddingBottom: "20px",
              boxShadow: "5px 5px 17px #00000044",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <div className="min-[600px]:w-[calc(100%-240px)] w-full mt-[64px]">{children}</div>
    </Box>
  );
}
