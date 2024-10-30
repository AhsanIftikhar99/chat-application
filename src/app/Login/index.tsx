import CustomDialog from "@/app/components/GenericModal";
import axios from "axios";

const formFields = [
  {
    placeholder: "Email Address/Phone Number",
    label: "Email Address/Phone Number",
    type: "email",
    name: "email",
  },
  {
    placeholder: "Password",
    label: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Login",
    type: "button",
    baseline: true,
  },
  {
    label: "Create a New Account",
    type: "button",
    baseline: false,
    sx: {
      backgroundColor: "white",
      border: "1px solid #08344D",
      color: "#08344D",
    },
  },
];

interface LoginProps {
  modaleOpen: boolean;
  handleModalClose: () => void;
}
export default function Login({ modaleOpen, handleModalClose }: LoginProps) {
  const login = async (
    username: string,
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
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
    login(
      formData.username,
      formData.email,
      formData.password,
      formData.displayName
    );
    handleModalClose();
  };

  return (
    <CustomDialog
      title="Login"
      open={modaleOpen}
      onClose={handleModalClose}
      formFields={formFields}
      onSubmit={handleSubmit}
    />
  );
}
