import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import sendIcon from "@/assets/images/sendIcon.svg";
import styles from "./index.module.scss"; // Import your styles

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
  className?: string;
  onClick?: () => void;
};

const toolbarOptions = [
  ["bold", "italic", "link"], // Basic text formatting
  ["code-block"], // Add code block
  [{ list: "ordered" }, { list: "bullet" }], // Ordered and unordered lists
];

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  theme = "snow",
  className,
  onClick
}) => {
  return (
    <div className={styles.textEditorContainer}>
      <ReactQuill
        theme={theme}
        value={value}
        onChange={onChange}
        className={className}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
      <button className={styles.customButton} onClick={onClick}>
        <img src={sendIcon.src} alt="Send Icon" />
      </button>
    </div>
  );
};

export default TextEditor;
