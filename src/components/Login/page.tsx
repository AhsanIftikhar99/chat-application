import CustomDialog from "@/components/GenericModal";
import axios from "axios";
import { loginFormFields } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type LoginProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
  setShowLoader: (value: boolean) => void;
};

export default function Login({ modaleOpen, handleModalClose, setShowLoader }: LoginProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true } // Enable sending cookies with the request
      );

      if (response.status === 200) {
        console.log("Login successful", response?.data);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        // Use transition to handle the navigation and loading state
        startTransition(() => {
          setShowLoader(true); // Start the loader
          router.push("/home"); // Navigate to the homepage
        });

        handleModalClose(); // Close the modal
      }
    } catch (error: any) {
      setShowLoader(false); // Stop loader on error
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
    setShowLoader(true); // Show loader when form submission begins
    login(formData.email, formData.password).finally(() => {
      setShowLoader(false); // Stop loader after login completion
    });
  };

  return (
    <CustomDialog
      title="Login"
      open={modaleOpen}
      onClose={handleModalClose}
      formFields={loginFormFields}
      onSubmit={handleSubmit}
    />
  );
}
