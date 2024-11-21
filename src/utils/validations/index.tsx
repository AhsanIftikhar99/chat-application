import * as yup from "yup";


export const getValidationSchema = (title: string) => {
  switch (title) {
    case "Signup":
      return yup.object().shape({
        email: yup.string().required("Email is required").matches(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'A valid email address is required.'),
        password: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
        displayName: yup
          .string()
          .required("Display name is required")
          .min(4, "Display name must be at least 4 characters"),
        username: yup
          .string()
          .required("Username is required")
          .min(4, "Username must be at least 4 characters"),
      });
    case "Login":
      return yup.object().shape({
        email: yup.string().required("Email is required").matches(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'A valid email address is required.'),
        password: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
      });
    case "Profile":
      return yup.object().shape({
        displayName: yup
          .string()
          .required("Display name is required")
          .min(4, "Display name must be at least 4 characters"),
        username: yup
          .string()
          .required("Username is required")
          .min(4, "Username must be at least 4 characters"),
        status: yup.string().required("Status is required").min(4, "Status must be at least 4 characters"),
      });
    default:
      return yup.object();
  }
};
