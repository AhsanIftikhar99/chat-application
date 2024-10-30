"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import pulseLogo from "../../assets/images/pulse.png";

const drawerWidth = 240;
const navItems = [
  "Privacy",
  "Help Center",
  "Pulse Web",
  "Download",
  "Try Pulse",
];

// Styles
const appBarStyles = {
  background: "white",
  fontWeight: "bold",
  boxShadow: "none", // Remove elevation
};

const iconButtonStyles = {
  mr: 2,
  display: { sm: "none" },
};

const menuIconTypographyStyles = {
  ml: "5px",
  fontSize: "24px",
  fontWeight: "bold",
};

const mainTypographyStyles = {
  fontSize: "30px",
  fontWeight: "bold",
  flexGrow: 1,
  display: { xs: "none", sm: "block" },
};

const drawerBoxStyles = {
  textAlign: "center",
};

const drawerTypographyStyles = {
  my: 2,
  fontSize: "30px",
  fontWeight: "bold",
};

const listItemButtonStyles = {
  textAlign: "center",
  textTransform: "none",
};

const buttonStyles = {
  fontWeight: "bold",
  textTransform: "none",
};

const tryPulseButtonStyles = {
  fontWeight: "bold",
  textTransform: "none",
  color: "white",
  background: "#08344D",
};

const drawerStyles = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
  background: "#08344D",
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={drawerBoxStyles}>
      <Typography color="primary" variant="h6" sx={drawerTypographyStyles}>
        Pulse
        <img
          src={pulseLogo.src}
          alt="Pulse Logo"
          width={"30px"}
          height={"16px"}
        />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={listItemButtonStyles}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={appBarStyles} component="nav">
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={iconButtonStyles}
          >
            <MenuIcon />
            <Typography sx={menuIconTypographyStyles}>
              Pulse
              <img
                src={pulseLogo.src}
                alt="Pulse Logo"
                width={"30px"}
                height={"16px"}
              />
            </Typography>
          </IconButton>
          <Typography variant="h6" component="div" color="primary" sx={mainTypographyStyles}>
            Pulse
            <img
              src={pulseLogo.src}
              alt="Pulse Logo"
              width={"30px"}
              height={"16px"}
            />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item === "Try Pulse" ? (
                <Button key={item} sx={tryPulseButtonStyles}>
                  {item}
                </Button>
              ) : (
                <Button key={item} color="primary" sx={buttonStyles}>
                  {item}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          color="primary"
          sx={drawerStyles}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}