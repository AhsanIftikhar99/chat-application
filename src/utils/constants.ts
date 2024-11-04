export const signupFormFields = [
  {
    placeholder: "Email Address/Phone Number",
    label: "Email Address/Phone Number",
    type: "email",
    name: "email",
    maxLenegth: 40,
  },
  {
    placeholder: "Display Name",
    label: "Display Name",
    type: "text",
    name: "displayName",
    minLength: 3,
    maxLenegth: 30,
  },
  {
    placeholder: "Username",
    label: "Username",
    type: "text",
    name: "username",
    minLength: 3,
    maxLenegth: 30,
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
    maxLength:40
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
    baseline: false,
    sx: {
      backgroundColor: "white",
      border: "1px solid #08344D",
      color: "#08344D",
    },
  },
];

export const defaultFormFieldsSxStyles ={
  '& .MuiFilledInput-root': {
    backgroundColor: 'white',
  },
  '& .MuiTextField-root': {
    backgroundColor: 'white',
  },
}
