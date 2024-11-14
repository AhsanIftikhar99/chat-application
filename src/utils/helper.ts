import localFont from "next/font/local";

export const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
export const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const getRighteous = localFont({
  src: "../assets/fonts/Righteous-Regular.ttf",
  variable: "--font-righteous",
  weight: "100 900",
});

export const getInputProps = (field: any) => ({
  disableUnderline: true,
  style: {
    background: field?.backgroundColor ? field.backgroundColor : "white",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    height: field?.height ? field?.height : "48px",
    color: field?.color ? field.color : "#08344D",
  },
  // inputProps: {
  //   type: field?.type,
  //   maxLength: field?.maxLength,
  //   minLength: field?.minLength,
  // },
});
