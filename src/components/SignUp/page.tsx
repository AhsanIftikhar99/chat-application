import CustomDialog from "@/components/GenericModal";
import axios from "axios";
import { signupFormFields } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useTransition } from "react";


type SignUpProps = {
  modaleOpen: boolean;
  handleModalClose: () => void;
  setShowLoader: (value: boolean) => void;
}

export default function SignUp({ modaleOpen, handleModalClose, setShowLoader}: SignUpProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const signup = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          username,
          email,
          password,
          displayName,
        },
        { withCredentials: true } // Enable sending cookies with the request
      );
      setShowLoader(false);
      if (response.status === 201) {
        console.log("Signup successful", response?.data?.user);
        localStorage.setItem("user", JSON.stringify(response?.data));
        startTransition(() => {
          setShowLoader(true); // Start the loader
          router.push("/home"); // Navigate to the homepage
        });
        handleModalClose();
      }
    } catch (error: any) {
      setShowLoader(false);
      if (error.response) {
        console.error("Signup failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log(formData);
    setShowLoader(true);
    signup(
      formData.username,
      formData.email,
      formData.password,
      formData.displayName
    );
  };

  return (
    <CustomDialog
      title="Sign Up"
      open={modaleOpen}
      onClose={handleModalClose}
      formFields={signupFormFields}
      onSubmit={handleSubmit}
    />
  );
}
