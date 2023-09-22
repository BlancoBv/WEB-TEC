import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import draftToHtml from "draftjs-to-html";

function HTMLEditor({ setVariable }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditor = (content) => {
    setEditorState(content); ///mantiene el valor dentro del editor, sin esto no funciona
    if (setVariable) {
      setVariable({
        html: {
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        },
      });
    }
  };
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div className="d-flex w-100 h-50 ">
      <Editor
        editorState={editorState}
        onEditorStateChange={/* setEditorState */ handleEditor}
      />
    </div>
  );
}

export default HTMLEditor;
