import CustomDialog from "@/components/GenericModal";
import axios from "axios";
import { loginFormFields } from "@/utils/constants";
import { useRouter } from "next/navigation";

interface LoginProps {
  modaleOpen: boolean;
  handleModalClose: () => void;
}

export default function Login({ modaleOpen, handleModalClose }: LoginProps) {

  const router = useRouter()
 
  const login = async (
    email: string,
    password: string,
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true } // Enable sending cookies with the request
      );

      if (response.status === 200) {
        console.log("Signup successful", response.data);
        router.push("/home");
        handleModalClose();
         // Navigate to the homepage
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Signup failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
    login(
      formData.email,
      formData.password,
    );
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
