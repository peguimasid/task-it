import 'highlight.js/styles/github-dark.css';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';

import { Icons } from './icons';
import { Toggle } from './ui/toggle';

const lowlight = createLowlight(common);

interface EditorProps {
  defaultValue: any;
  placeholder?: string;
  onChange: (newValue: JSONContent) => void;
}

export const Editor = ({ defaultValue, onChange, placeholder }: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    },
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({
        lowlight
      }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Write something...',
        emptyEditorClass:
          'before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]'
      })
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => onChange(editor.getJSON())
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent
        className="prose prose-sm prose-stone max-w-full dark:prose-invert md:prose-lg dark:prose-pre:bg-secondary/70"
        editor={editor}
      />
      <BubbleMenu
        editor={editor}
        updateDelay={0}
        className="flex divide-x overflow-hidden rounded-lg border bg-card shadow-lg shadow-black/20"
      >
        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icons.bold className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icons.italic className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icons.strikethrough className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8 rounded-none"
          pressed={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Icons.code className="h-3.5 w-3.5" />
        </Toggle>
      </BubbleMenu>
    </>
  );
};
