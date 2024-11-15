"use client";

import { useState } from "react";
import SignUp from "@/components/SignUp/page";
import Login from "@/components/Login/page";
import CustomButton from "../GenericButton";

type ModalManagerProps = {
  handleLoginModalOpen: () => void;
};

const ModalManager: React.FC = () => {
  const [modaleOpen, setModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
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
      <SignUp
        modaleOpen={modaleOpen}
        handleLoginModalOpen={handleLoginModalOpen}
        handleModalClose={handleModalClose}
      />
      <Login
        modaleOpen={loginModalOpen}
        handleModalClose={handleLoginModalClose}
        signUpModalOpen={handleModalOpen}
      />
    </>
  );
};

export default ModalManager;
