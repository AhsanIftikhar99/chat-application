import CustomDialog from "@/components/common/GenericModal";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import CustomSnackbar from "../Toaster";
import { User } from "@/utils/types";

type LoginProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
  signUpModalOpen: () => void;
};

export default function Login({ modaleOpen, handleModalClose ,signUpModalOpen}: LoginProps) {
  const router = useRouter();

  const loginFormFields = [
    {
      placeholder: "Email Address/Phone Number",
      label: "Email Address/Phone Number",
      type: "email",
      name: "email",
      maxLength:40,
      minLength: 6,
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
      baseline: true,
    },
    {
      label: "Create a New Account",
      type: "button",
      onClick: () =>{
        handleModalClose();
        signUpModalOpen();
      } ,
      baseline: false,
      sx: {
        backgroundColor: "white",
        border: "1px solid #08344D",
        color: "#08344D",
      },
    },
  ];
  

  // Define the success handler with the correct type
  const handleSuccess = (data: { user: User }) => {
    router.push("/home"); 
    handleModalClose(); 
  };

  // Use the hook with the specific response type
  const { mutate: login, status, isError } = usePost({
    onPostReqSuccess: handleSuccess,
    onPostReqError(error) {
      
    },
  });

  // Handle form submission
  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
    if(formData.email === "" || formData.password === ""){
      return;
    }
    login({
      API_URL: "/api/auth/login",
      BODY: { email: formData.email, password: formData.password },
    });
  };

  return (
    <>
      {/* Display Loader if isLoading is true */}
      {status==="pending" && <Loader />}
      {isError && <CustomSnackbar message="Login failed" severity="error" />}
      <CustomDialog
        title="Login"
        open={modaleOpen}
        onClose={handleModalClose}
        formFields={loginFormFields}
        onSubmit={handleSubmit}
      />
    </>
  );
}
