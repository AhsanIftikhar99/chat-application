"use client";

import globeImage from "@/app/assets/images/globe.png";
import Navbar from "@/app/components/Navbar";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CustomButton from "./components/GenericButton";
import SignUp from "./SignUp";
import Login from "./Login";

export default function Home() {
  const [modaleOpen, setModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


  return (
    <>
      <Navbar />
      <Container
        sx={{
          height: "100vh",
          width: "100%",
          marginTop: { xs: "90px", md: "140px" },
          padding: { xs: "30px", md: "none" },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
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
                onClick={handleModalOpen}
                sx={{
                  mt: "20px",
                  width: { xs: "100px", md: "200px" },
                  height: "50px",
                  borderRadius: "8px",
                }}
              />
              <CustomButton
                title="Login"
                onClick={handleLoginModalOpen}
                sx={{
                  ml: "10px",
                  mt: "20px",
                  width: { xs: "100px", md: "200px" },
                  height: "50px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
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
        <SignUp modaleOpen={modaleOpen} handleModalClose={handleModalClose} />
        <Login
          modaleOpen={loginModalOpen}
          handleModalClose={handleLoginModalClose}
        />
      </Container>
    </>
  );
}