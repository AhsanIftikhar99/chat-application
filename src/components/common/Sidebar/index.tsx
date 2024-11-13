"use client";
import { userLogout } from '@/api/user';
import { ProfileModal } from '@/components/ProfileModals/ProfileDetails';
import { useGetLoggedInUser } from '@/hooks/useGetLoggedInUser';
import { User } from '@/utils/types';
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
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from 'react';

const drawerWidth = 60;

const iconStyles = {
  color: "white",
  "&:hover": {
    color: "#08344D",
  },
};

const addIconStyles = {
  ml: '30px',
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
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const { data: loggedInUser = {} as User } = useGetLoggedInUser();


  useEffect(() => {
    if (loggedInUser?.profilePicture && typeof loggedInUser.profilePicture !== 'string') {
      const base64String = Buffer.from(loggedInUser.profilePicture.data).toString('base64');
      setProfilePictureUrl(`data:image/png;base64,${base64String}`);
    }
  }, [loggedInUser?.profilePicture]);


  const handleProfileModalClose = () => setOpenProfileModal(false);
  const handleProfileModalOpen = () => setOpenProfileModal(true);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLogout= async() => {
    const  Logout= await userLogout()
    if(Logout){
      handleMenuClose();
      window.location.href = '/'
    }
  
  };

  const handleProfile = () => {
    handleProfileModalOpen();
    handleMenuClose();
  };

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
        <Box sx={accountCircleBoxStyles} onClick={handleMenuOpen}>
          <Avatar>
          {profilePictureUrl ? (
              <img src={profilePictureUrl} alt="profile" />
            ) : (
            <AccountCircle sx={{ color: "white", fontSize: 40 }} />
          )}
          </Avatar>
          <Box sx={statusIndicatorStyles} />
        </Box>
      </Box>
      <ProfileModal isOpen={openProfileModal} handleClose={handleProfileModalClose} />
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        sx={{ top:'-40px', left: '-15px' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Drawer>
  );
}

// Styles (remain unchanged)
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
    overflowY: 'hidden',
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
  cursor: "pointer", // Make the avatar appear clickable
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
