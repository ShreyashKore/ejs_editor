import React from "react";
import Editor, { EditorProps } from "@monaco-editor/react";
import EditorLoading from "./editor_loading";

interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: string;
  className?: string;
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
  value,
  onChange,
  language = "javascript",
  height = "100%",
  className = "",
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value);
  };

  const editorOptions: EditorProps["options"] = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: "on",
    roundedSelection: false,
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false,
  };

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      value={value}
      onChange={handleEditorChange}
      options={editorOptions}
      loading={<EditorLoading />}
      className={`overflow-hidden rounded-xl ${className}`}
      theme="customTheme"
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("customTheme", {
          base: "vs",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#ffffff88",
            "editorCursor.foreground": "#8c4c89",
          },
        });
      }}
      onMount={(editor, monaco) => {
        monaco.editor.setTheme("customTheme");
      }}
    />
  );
};

export default MonacoEditorWrapper;
