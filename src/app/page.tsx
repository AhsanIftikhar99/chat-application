import globeImage from "@/assets/images/globe.png";
import ModalManager from "@/components/ModalManager";
import Navbar from "@/components/Navbar";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";


export default function App() {
  return (
    <Container
      sx={{
        height: "calc(100vh - 90px)",
        width: "100%",
        padding: { xs: "30px", md: "22px" },
        maxWidth: "100% !important",
        mt: "20px",
      }}
    >
      <Navbar />
      <Toolbar />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{ fontSize: { xs: "24px", md: "40px", fontWeight: "bold" } }}
            color="primary"
            variant="h3"
          >
            Communicate, Anywhere, Anytime
          </Typography>
          <Typography
            sx={{
              mt: "20px",
              fontSize: "16px",
              fontWeight: "lightbold",
              width: { xs: "100%", md: "90%" },
            }}
            color="primary"
            variant="body1"
          >
            Connect effortlessly across all devices with Pulse. Break free from
            limitations and redefine communication, anytime, anywhere.
          </Typography>
          <Box sx={{ mt: "10px" }}>
          <ModalManager />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={globeImage.src}
            alt="Globe"
            height={"250px"}
            width={"420px"}
          />
        </Grid>
      </Grid>

    </Container>
  );
}
