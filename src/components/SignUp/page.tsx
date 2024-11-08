// components/SignUp.tsx

import CustomDialog from "@/components/common/GenericModal";
import usePost from "@/hooks/usePost";
import { signupFormFields } from "@/utils/constants";
import { useState } from "react";
import Loader from "../Loader";
import SignupConfirmationModal from "../SignConfirmationModal";
import CustomSnackbar from "../Toaster";

type SignUpProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
};

export default function SignUp({ modaleOpen, handleModalClose }: SignUpProps) {
 
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
