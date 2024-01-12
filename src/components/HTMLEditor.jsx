import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from "draft-js";
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
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(initialContent)
        )
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
    <div className="d-flex flex-grow-1">
      <Editor
        editorClassName="editor-main"
        wrapperClassName="editor-container"
        toolbarClassName="editor-toolbar"
        editorState={editorState}
        onEditorStateChange={/* setEditorState */ handleEditor}
        localization={{
          locale: "es",
        }}
      />
    </div>
  );
}

export default HTMLEditor;
