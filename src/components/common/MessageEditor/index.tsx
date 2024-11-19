// components/TextEditor.tsx

import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
  className?: string;
}

const toolbarOptions = [
  ['bold', 'italic','link'],       
  ['code-block', 'list'],

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
