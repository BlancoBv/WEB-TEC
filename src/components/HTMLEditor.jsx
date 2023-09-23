import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

function HTMLEditor({ setVariable, initialContent }) {
  const intialValue = {
    blocks: [
      {
        key: "5ra2q",
        text: "Borra este texto para comenzar.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 31,
            style: "ITALIC",
          },
        ],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };
  const [editorState, setEditorState] = useState(() =>
    initialContent
      ? EditorState.createWithContent(convertFromRaw(initialContent))
      : EditorState.createWithContent(convertFromRaw(intialValue))
  );

  const handleEditor = (content) => {
    setEditorState(content); ///mantiene el valor dentro del editor, sin esto no funciona
    if (setVariable) {
      setVariable({
        html: {
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        },
        json: convertToRaw(editorState.getCurrentContent()),
      });
    }
  };

  return (
    <div className="d-flex w-100 h-50 ">
      <Editor
        editorClassName="customEditor"
        wrapperClassName="customWrapper"
        editorState={editorState}
        onEditorStateChange={/* setEditorState */ handleEditor}
      />
    </div>
  );
}

export default HTMLEditor;
