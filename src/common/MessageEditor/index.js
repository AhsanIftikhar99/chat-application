import React, { useRef, useState } from 'react';
import Editor from './Editor';
import Quill from 'quill';

const Delta = Quill.import('delta');

const MessageEditor = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <div>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

     
    
    </div>
  );
};

export default MessageEditor