import React from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TextEditorProps {
  value: string;
  onBlur: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onBlur }) => {
  const config = {
    readonly: false,
    height: 500,
    placeholder: "Nhập nội dung...",
  };

  return (
    <JoditEditor
      value={value}
      config={config}
      onBlur={(newContent) => onBlur(newContent)}
    />
  );
};

export default TextEditor;
