"use client";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import UploadIcon from "@mui/icons-material/CloudUpload";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { icon: <HomeIcon />, label: "Home", path: "/" },
  { icon: <WhatshotIcon />, label: "Trending", path: "/trending" },
  { icon: <UploadIcon />, label: "Upload", path: "/upload" },
];

const AppNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isCollapsed ? 80 : 240,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid #ddd",
        transition: "width 0.3s",
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-end",
          px: 1,
        }}
      >
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {navItems.map(({ icon, label, path }) => (
          <ListItem key={label} disablePadding sx={{ display: "block" }}>
            <Tooltip title={isCollapsed ? label : ""} placement="right">
              <ListItemButton
                component={Link}
                href={path}
                sx={{
                  minHeight: 48,
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 2,
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={label} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AppNavBar;
