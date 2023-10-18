'use client';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';

import 'highlight.js/styles/github-dark.css';

import { Icons } from './icons';
import { ScrollArea } from './ui/scroll-area';
import { Toggle } from './ui/toggle';

const lowlight = createLowlight(common);

lowlight.register({ css, html, js, ts });

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
      <EditorContent className="prose prose-stone max-w-full dark:prose-invert" editor={editor} />
      <FloatingMenu
        editor={editor}
        shouldShow={({ state }) => {
          const { $from } = state.selection;
          const currentLineText = $from.nodeBefore?.textContent;
          return currentLineText === '/';
        }}
      >
        <ScrollArea className="flex h-72 w-72 flex-col gap-1 rounded-lg border bg-card p-1 shadow-lg shadow-black/20">
          <span className="px-1 text-xs font-semibold text-muted-foreground">Basic blocks</span>
          <button
            type="button"
            className="group flex w-full flex-row items-center gap-2 rounded p-1 hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded border text-muted-foreground group-hover:border-primary/10">
              <Icons.text className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="text-xs text-muted-foreground">Just start writing with plain text.</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="group flex w-full flex-row items-center gap-2 rounded p-1 hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded border text-muted-foreground group-hover:border-primary/10">
              <Icons.heading1 className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xs text-muted-foreground">Big section heading.</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="group flex w-full flex-row items-center gap-2 rounded p-1 hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded border text-muted-foreground group-hover:border-primary/10">
              <Icons.heading2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 2</span>
              <span className="text-xs text-muted-foreground">Medium section heading.</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="group flex w-full flex-row items-center gap-2 rounded p-1 hover:bg-secondary"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded border text-muted-foreground group-hover:border-primary/10">
              <Icons.heading3 className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 3</span>
              <span className="text-xs text-muted-foreground">Small section heading.</span>
            </div>
          </button>
        </ScrollArea>
      </FloatingMenu>
      <BubbleMenu
        editor={editor}
        className="flex space-x-1 overflow-hidden rounded-lg border bg-card p-1 shadow-lg shadow-black/20"
      >
        <Toggle
          size="sm"
          className="h-8"
          pressed={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icons.bold className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8"
          pressed={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icons.italic className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8"
          pressed={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icons.strikethrough className="h-3.5 w-3.5" />
        </Toggle>
        <Toggle
          size="sm"
          className="h-8"
          pressed={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Icons.code className="h-3.5 w-3.5" />
        </Toggle>
      </BubbleMenu>
    </>
  );
};
