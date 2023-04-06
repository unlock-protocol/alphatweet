import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value?: string;
  onChange: (value?: string) => void;
}

export function Editor({ value, onChange }: Props) {
  return (
    <MDEditor
      previewOptions={{
        rehypePlugins: [rehypeSanitize],
      }}
      height={400}
      preview="edit"
      value={value}
      onChange={onChange}
    />
  );
}

export default Editor;
