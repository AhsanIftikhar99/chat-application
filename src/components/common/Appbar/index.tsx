// CustomAppBar.js
import { AppBar, Box, Toolbar } from "@mui/material";
import AppbarSearch from "../Formfields/AppbarField";


const drawerWidth = 60;

const formField =
{
    placeholder: "",
    label: "Search Qlu Recruiting",
    type: "text",
    name: "search",
    backgroundColor: '#124766',
    height: '45px',
    color: 'white',
}


export default function CustomAppBar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
                height: "60px",
                boxShadow: "none",
                backgroundColor: "#08344D",
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box sx={{maxWidth:'500px', width:'100%'}}>
                    <AppbarSearch field={formField} />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
