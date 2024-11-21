"use client";

import { useState } from "react";
import SignUp from "@/components/SignUp/page";
import Login from "@/components/Login/page";
import CustomButton from "../GenericButton";
import styles from "./index.module.scss";

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
        className={styles.signUpButton}
      />
      <CustomButton
        title="Login"
        onClick={handleLoginModalOpen}
        className={styles.loginButton}
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
