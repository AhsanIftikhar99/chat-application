import GroupIcon from "@mui/icons-material/Group";
import Link from "next/link";
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
import { getUsersHaveChatWith } from "@/app/directmessage/[dmSpecificUser]/_apis";
import { getCookieHeader } from "@/utils/helper/getCookieHeader";
import DirectMessagesList from "@/components/DirectMessageList";
import MessageIcon from "@mui/icons-material/Message";


type SideMenuProps = {
  currentPath: string; 
};

export default async function SideMenu({ currentPath }: SideMenuProps) {
  const cookieHeader = await getCookieHeader();
  const userHaveChatWith = await getUsersHaveChatWith(cookieHeader as string);

  return (
    <Box sx={containerStyles}>
      <Typography variant="h6" sx={titleStyles}>
        QLU Recruiting
      </Typography>

      <Divider />

      <List>
        <ListItem disablePadding>
          <Link style={{ width: '100%' }} href="/groups" passHref>
            <ListItemButton selected={currentPath === "/groups"} sx={listItemButtonStyles}>
              <ListItemIcon sx={iconStyles}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" sx={textStyles} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link style={{width:'100%'}} href="/directmessage" passHref>
            <ListItemButton
              selected={currentPath === "/directmessage"}
              sx={listItemButtonStyles}
            >
              <ListItemIcon sx={iconStyles}>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Direct Messages" sx={textStyles} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>

      <Box sx={footerBoxStyles}>
        <Typography variant="body2" sx={footerTextStyles}>
          Groups &gt;
        </Typography>
       {/* Render the DirectMessagesList component */}
       <DirectMessagesList users={userHaveChatWith} currentPath={currentPath} />
      </Box>
    </Box>
  );
}

// Styles (as before)
const containerStyles = {
  width: 300,
  backgroundColor: "#FAFDFF",
  padding: "10px",
  borderRight: "1px solid #E0E0E0",
  display: 'flex',
  height: "100%",
  flexDirection: 'column',
  pt: '70px',
  minHeight: 'calc(100vh-60px)',
};

const titleStyles = {
  color: "#214F6D",
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
  width: '100%',
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
