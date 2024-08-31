import React from "react";
import Editor, { EditorProps } from "@monaco-editor/react";

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
      className={`overflow-hidden rounded-lg ${className}`}
      theme="vs-dark"
      beforeMount={(monaco) => {
        monaco.editor.defineTheme("customTheme", {
          base: "vs-dark",
          inherit: true,
          rules: [],
          colors: {
            "editor.background": "#1a1a1a",
            "editor.foreground": "#ffffff",
            "editor.lineHighlightBackground": "#2a2a2a",
            "editorCursor.foreground": "#ffffff",
            "editorLineNumber.foreground": "#666666",
          },
        });
        monaco.editor.setTheme("customTheme");
      }}
    />
  );
};

export default MonacoEditorWrapper;
