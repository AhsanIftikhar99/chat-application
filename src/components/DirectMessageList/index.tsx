"use client";

import { User } from "@/utils/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Avatar,
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type DirectMessagesListProps = {
    users: (Pick<User, "displayName" | "username"> & {
        userid: string;
        profilePicture?: string;
    })[];
    currentPath: string;
};

export default function DirectMessagesList({ users, currentPath }: DirectMessagesListProps) {
    // Get current path and extract userId from it if available
    const pathname = usePathname();
    const selectedUserId = pathname.split("/")[2]; // Assuming path is /chatwithuser/[userid]
    console.log('selectedUserId', selectedUserId);
    const [isOpen, setIsOpen] = useState(selectedUserId ? true : false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton sx={{ padding: '0px !important' }} onClick={handleToggle} selected={currentPath === "/chatwithuser"}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText sx={buttonStyle} primary="Direct Messages" />
                        {isOpen ? <KeyboardArrowDownIcon sx={iconDownStyles} /> : <ArrowForwardIosIcon sx={iconStyles} />}
                    </Box>
                </ListItemButton>
            </ListItem>

            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {users.map((user) => {
                        const isSelected = selectedUserId === user.userid;
                        return (
                            <ListItem key={user.userid} disablePadding>
                                <Link href={`/chatwithuser/${user.userid}`} passHref>
                                    <ListItemButton sx={{ padding: '3px !important', ...(isSelected && selectedUserStyle), width: '200px' }}>
                                        <ListItemIcon sx={{ minWidth: '35px' }}>
                                            {user.profilePicture ? (
                                                <Avatar src={user.profilePicture} />
                                            ) : (
                                                <AccountCircleIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText sx={usernameStyles} primary={user.displayName || user.username} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
}

const buttonStyle = {
    color: "#08344D",
    mb: 1,
    fontSize: '0.875rem !important',
    width: '150px',
    '& .MuiTypography-root': {
        fontSize: '0.875rem',
        fontWeight: 'bold',
        width: '150px',
    }
};

const usernameStyles = {
    '& .MuiTypography-root': { color: '#245E80', fontWeight: 'bold', fontSize: '14px !important' },
}

const iconStyles = {
    color: "#08344D",
    fontSize: '0.875rem',
    fontWeight: 'bold',
    ml: 1,
};


const iconDownStyles = {
    color: "#08344D",
    fontSize: '1.3rem',
    fontWeight: 'bold',
    mb: '3px'
};

// Style for selected user
const selectedUserStyle = {
    backgroundColor: '#C7EAFF !important', // Highlight selected user
    pl:'15px !important',
};
