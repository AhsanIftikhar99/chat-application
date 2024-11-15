// components/TextEditor.tsx

import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
  className?: any;
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['code-block'],
  ['link', 'image'],
  ['clean']
];

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  theme = 'snow',
  className
}) => {
  return (
    <ReactQuill
      theme={theme}
      value={value}
      onChange={onChange}
      className={className}
      modules={{
        toolbar: toolbarOptions,
      }}
    />
  );
};

export default TextEditor;
