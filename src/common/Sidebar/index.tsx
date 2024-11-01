// Sidebar.js
import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar
} from "@mui/material";
import {
  AccountCircle,
  ChatBubble as ChatBubbleIcon,
  Groups as GroupsIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

const drawerWidth = 60;

const iconStyles = {
  color: "white",
  "&:hover": {
    color: "#08344D",
  },
};

const addIconStyles = {
  ml:'30px',
  color: "white",
  "&:hover": {
    color: "#08344D",
  },
};

const listItems = [
  { text: "Home", icon: <HomeIcon sx={iconStyles} /> },
  { text: "Groups", icon: <GroupsIcon sx={iconStyles} /> },
  { text: "Chat", icon: <ChatBubbleIcon sx={iconStyles} /> },
  { text: "Notifications", icon: <NotificationsIcon sx={iconStyles} /> },
  { text: "More", icon: <MoreVertIcon sx={iconStyles} /> },
];

export default function Sidebar() {
  return (
    <Drawer sx={drawerStyles} variant="permanent" anchor="left">
      <Toolbar sx={toolbarStyles}>
        <Box sx={logoBoxStyles}>
          <LocalParkingIcon sx={{ color: "white" }} />
        </Box>
      </Toolbar>
      <Box sx={listContainerStyles}>
        <List sx={listStyles}>
          {listItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton sx={listItemButtonStyles}>
                <ListItemIcon sx={iconStyles}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={profileBoxStyles}>
        <ListItemButton sx={addButtonStyles}>
          <ListItemIcon sx={addIconStyles}>
            <AddIcon />
          </ListItemIcon>
        </ListItemButton>
        <Box sx={accountCircleBoxStyles}>
          <AccountCircle sx={{ color: "white", fontSize: 40 }} />
          <Box sx={statusIndicatorStyles} />
        </Box>
      </Box>
    </Drawer>
  );
}

// Styles
const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#08344D",
    color: "white",
    boxShadow: "none",
    overflowX: "hidden",
    overflowY:'hidden',
  },
};

const toolbarStyles = {
  padding: '0px !important',
  marginLeft: '10px',
};

const logoBoxStyles = {
  p: 1,
  background: "black",
};

const listContainerStyles = {
  overflow: "none",
};

const listStyles = {
  color: "white",
};

const listItemButtonStyles = {
  width: "20px !important",
  "&:hover": {
    backgroundColor: "white",
    "& .MuiListItemIcon-root": {
      color: "#08344D !important",
    },
  },
};

const profileBoxStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  mb: 2,
};

const addButtonStyles = {
  width: "40px !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mb: 2,
  "&:hover": {
    backgroundColor: "white",
    "& .MuiListItemIcon-root": {
      color: "#08344D !important",
    },
  },
};

const accountCircleBoxStyles = {
  position: "relative",
};

const statusIndicatorStyles = {
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 12,
  height: 12,
  backgroundColor: "green",
  borderRadius: "50%",
  border: "2px solid #08344D",
};
