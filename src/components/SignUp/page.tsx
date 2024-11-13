// components/SignUp.tsx

import CustomDialog from "@/components/common/GenericModal";
import usePost from "@/hooks/usePost";
import { useState } from "react";
import Loader from "../Loader";
import SignupConfirmationModal from "../SignConfirmationModal";
import CustomSnackbar from "../Toaster";

type SignUpProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
  handleLoginModalOpen: () => void;
};

export default function SignUp({ modaleOpen, handleModalClose ,handleLoginModalOpen}: SignUpProps) {

  const signupFormFields = [
    {
      placeholder: "Email Address/Phone Number",
      label: "Email Address/Phone Number",
      type: "email",
      name: "email",
      maxLength:40,
      minLength: 6,
    },
    {
      placeholder: "Display Name",
      label: "Display Name",
      type: "text",
      name: "displayName",
      minLength: 3,
      maxLenegth: 30,
    },
    {
      placeholder: "Username",
      label: "Username",
      type: "text",
      name: "username",
      minLength: 4,
      maxLenegth: 30,
    },
    {
      placeholder: "Password",
      label: "Password",
      type: "password",
      name: "password",
      minLength: 6,
      maxLenegth: 30,
    },
    {
      label: "Login",
      type: "button",
      name: "Already have an account? Login",
      baseline: true,
    },
    {
      label: "Already have an account? Login",
      type: "button",
      name: "Already have an account? Login",
      onClick: () => {
        handleModalClose();
        handleLoginModalOpen();
      },
      baseline: false,
      sx: {
        backgroundColor: "white",
        border: "1px solid #08344D",
        color: "#08344D",
      },
    },
  ];
  
 
  const [openSignupConfirmationModal, setOpenSignupConfirmationModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSuccess = (data: any) => {
     console.log("Signup successful", data);
    // router.push("/home"); // Navigate to the homepage
    handleModalClose();
    setOpenSignupConfirmationModal(true);
   
  };


  const { mutate: signup, status, isError } = usePost({
    onPostReqSuccess: handleSuccess,
  });

  const handleSubmit = (formData: { [key: string]: any }) => {
    setEmail(formData.email);
    if(formData.email === "" || formData.password === "" || formData.username === "" || formData.displayName === ""){
      return;
    }
    signup({
      API_URL: "/api/auth/signup",
      BODY: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
      },
    });
  };

  return (
    <>
      {status === 'pending' && <Loader />} {/* Show loader if request is in progress */}
      {isError && <CustomSnackbar message={'Signup Failed'} severity="error" />} {/* Show error message if signup fails */}
      <CustomDialog
        title="Sign Up"
        open={modaleOpen}
        onClose={handleModalClose}
        formFields={signupFormFields}
        onSubmit={handleSubmit}
      />

      <SignupConfirmationModal open={openSignupConfirmationModal} handleClose={() => {setOpenSignupConfirmationModal(false) }} email={email} />

    </>
  );
}
