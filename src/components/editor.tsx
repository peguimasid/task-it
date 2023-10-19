'use client';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';

import 'highlight.js/styles/github-dark.css';

import { Icons } from './icons';
import { Toggle } from './ui/toggle';

const lowlight = createLowlight(common);

export const Editor = () => {
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
        placeholder: 'Type here to write your description...',
        emptyEditorClass:
          'before:select-none before:pointer-events-none before:float-left before:h-0 before:text-muted-foreground before:content-[attr(data-placeholder)]'
      })
    ],
    content:
      '<h1>Advantages of Tailwind CSS</h1> <p>Tailwind CSS is a utility-first CSS framework that offers several advantages for web development:</p> <pre> <code class="language-javascript">function main() { \n\treturn "Hello World"\n } </code></pre> <a href="https://github.com/peguimasid">Github</a> <ul> <li> <strong>Saves Time and Effort: </strong> <span>Tailwind classes enable rapid styling, reducing the need to write custom CSS.</span> </li> <li> <strong>Scalability: </strong> <span>Easily scale your design to fit the needs of your project.</span> </li> <li> <strong>Maintainability: </strong> <span>Clear and predictable class names make code maintainable and readable.</span> </li> </ul>'
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent
        className="prose prose-stone max-w-full dark:prose-invert prose-pre:bg-secondary/40"
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
