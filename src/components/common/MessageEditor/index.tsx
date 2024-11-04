// components/TextEditor.tsx

import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  theme?: string;
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'direction': 'rtl' }],
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean']
];

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  theme = 'snow',
}) => {
  return (
    <ReactQuill
      theme={theme}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbarOptions,
      }}
    />
  );
};

export default TextEditor;
