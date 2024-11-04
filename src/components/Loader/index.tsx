// components/Loader.tsx

import { Box, CircularProgress, Typography } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1300,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" sx={{ mt: 2, color: "#08344D" }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
