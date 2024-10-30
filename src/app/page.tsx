import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Navbar from "@/app/components/Navbar";
import globeImage from "@/app/assets/images/globe.png";
import CustomButton from "./components/GenericButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          height: "100vh",
          width: "100%",
          marginTop: { xs: "90px", md: "140px" },
          padding: { xs: "30px", md: 'none' },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            xs={12} // Full width on small screens
            md={6} // Half width on medium and larger screens
            sx={{
              display: "flex",
              flexDirection: "column", // Stack items vertically
              justifyContent: "flex-start",
              alignItems: "flex-start", // Align items to the start of the box
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
              Connect effortlessly across all devices with Pulse. Break free
              from limitations and redefine communication, anytime, anywhere.
            </Typography>
            <Box sx={{ mt: "10px" }}>
              <CustomButton
                title="Sign Up"
                sx={{
                  mt: "20px",
                  width: { xs: "100px", md: "200px" },
                  height: "50px",
                }}
              />
              <CustomButton
                title="Login"
                sx={{
                  ml: "10px",
                  mt: "20px",
                  width: { xs: "100px", md: "200px" },
                  height: "50px",
                }}
              />
            </Box>
          </Grid>
          <Grid
            xs={12} // Full width on small screens
            md={6} // Half width on medium and larger screens
            sx={{
              display: "flex",
              justifyContent: "center", // Center the image horizontally
              alignItems: "center", // Center the image vertically
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
    </>
  );
}
