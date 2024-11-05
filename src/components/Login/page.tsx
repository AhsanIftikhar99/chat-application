import CustomDialog from "@/components/GenericModal";
import usePostDataToServer from "@/hooks/usePostDatatoServer";
import { loginFormFields } from "@/utils/constants";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import CustomSnackbar from "../Toaster";

type LoginProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
};

export default function Login({ modaleOpen, handleModalClose }: LoginProps) {
  const router = useRouter();
  

  // Define the success handler with the correct type
  const handleSuccess = (data: { user: any }) => {
    localStorage.setItem("user", JSON.stringify(data.user))
    router.push("/home"); 
    handleModalClose(); 
  };

  // Use the hook with the specific response type
  const { mutate: login, status, isError } = usePostDataToServer<any>({
    onPostReqSuccess: handleSuccess,
  });

  // Handle form submission
  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
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
