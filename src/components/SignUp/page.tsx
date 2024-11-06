// components/SignUp.tsx

import CustomDialog from "@/components/common/GenericModal";
import usePostDataToServer from "@/hooks/usePostDatatoServer";
import { signupFormFields } from "@/utils/constants";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import CustomSnackbar from "../Toaster";

type SignUpProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
};

export default function SignUp({ modaleOpen, handleModalClose }: SignUpProps) {
  const router = useRouter();


  const handleSuccess = (data: any) => {
    console.log("Signup successful", data);
    router.push("/home"); // Navigate to the homepage
    handleModalClose();
  };


  const { mutate: signup, status, isError } = usePostDataToServer({
    onPostReqSuccess: handleSuccess,
  });

  const handleSubmit = (formData: { [key: string]: any }) => {
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
    </>
  );
}
