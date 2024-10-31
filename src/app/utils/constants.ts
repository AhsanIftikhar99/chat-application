export const signupFormFields = [
  {
    placeholder: "Email Address/Phone Number",
    label: "Email Address/Phone Number",
    type: "email",
    name: "email",
  },
  {
    placeholder: "Display Name",
    label: "Display Name",
    type: "text",
    name: "displayName",
  },
  {
    placeholder: "Username",
    label: "Username",
    type: "text",
    name: "username",
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
    name: "Already have an account? Login",
    baseline: true,
  },
  {
    label: "Already have an account? Login",
    type: "button",
    name: "Already have an account? Login",
    baseline: false,
    sx: {
      backgroundColor: "white",
      border: "1px solid #08344D",
      color: "#08344D",
    },
  },
];

export const loginFormFields = [
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
