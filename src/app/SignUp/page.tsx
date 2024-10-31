import CustomDialog from "@/app/components/GenericModal";
import axios from "axios";
import { signupFormFields } from "@/app/utils/constants";


interface SignUpProps {
  modaleOpen: boolean;
  handleModalClose: () => void;
}

export default function SignUp({ modaleOpen, handleModalClose }: SignUpProps) {
  
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

      if (response.status === 201) {
        console.log("Signup successful", response.data);
        return response.data; // Contains the success message
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
    signup(
      formData.username,
      formData.email,
      formData.password,
      formData.displayName
    );
    handleModalClose();
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
