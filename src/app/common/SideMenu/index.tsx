"use client";
import React, { useState } from "react";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from '@mui/icons-material/Message';

export default function SideMenu() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={containerStyles}>
            <Typography variant="h6" sx={titleStyles}>
                QLU Recruiting
            </Typography>

            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={() => handleListItemClick(0)}
                        sx={listItemButtonStyles}
                    >
                        <ListItemIcon sx={iconStyles}>
                            <GroupIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Groups"
                            sx={textStyles}
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={() => handleListItemClick(1)}
                        sx={listItemButtonStyles}
                    >
                        <ListItemIcon sx={iconStyles}>
                            <MessageIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Direct Messages"
                            sx={textStyles}
                        />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={footerBoxStyles}>
                <Typography variant="body2" sx={footerTextStyles}>
                    Groups &gt;
                </Typography>
                <Typography variant="body2" sx={footerTextStyles}>
                    Direct Messages &gt;
                </Typography>
            </Box>
        </Box>
    );
}

// Styles
const containerStyles = {
    width: 300,
    backgroundColor: "#FAFDFF",
    padding: "10px",
    borderRight: "1px solid #E0E0E0",
    display: 'flex',
    height: "100%",
    flexDirection: 'column',
};

const titleStyles = {
    color: "primary",
    mb: "10px",
    fontWeight: "bold",
};

const listItemButtonStyles = {
    '&.Mui-selected': {
        backgroundColor: '#c7eaff',
    },
    '&.Mui-selected:hover': {
        backgroundColor: '#c7eaff',
    },
    '&:hover': {
        backgroundColor: '#e0f4ff',
    },
};

const iconStyles = {
    color: '#08344D',
    p: 0,
    minWidth: '30px',
};

const textStyles = {
    color: '#08344D',
    '& .MuiTypography-root': {
        fontSize: '14px',
        fontWeight: 'bold',
    },
};

const footerBoxStyles = {
    mt: 2,
    ml: 2,
};

const footerTextStyles = {
    color: "#08344D",
    mb: 1,
    fontWeight: 'bold',
};
