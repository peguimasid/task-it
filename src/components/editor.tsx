'use client';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';

import 'highlight.js/styles/github-dark.css';

const lowlight = createLowlight(common);

lowlight.register({ css, html, js, ts });

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    content:
      '<h1>Advantages of Tailwind CSS</h1> <p>Tailwind CSS is a utility-first CSS framework that offers several advantages for web development:</p> <pre> <code class="language-javascript">function main() { \n\treturn "Hello World"\n } </code></pre> <a href="https://github.com/peguimasid">Github</a> <ul> <li> <strong>Saves Time and Effort: </strong> <span>Tailwind classes enable rapid styling, reducing the need to write custom CSS.</span> </li> <li> <strong>Scalability: </strong> <span>Easily scale your design to fit the needs of your project.</span> </li> <li> <strong>Maintainability: </strong> <span>Clear and predictable class names make code maintainable and readable.</span> </li> </ul>',
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    }
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent className="prose prose-stone max-w-full dark:prose-invert" editor={editor} />
      <BubbleMenu
        editor={editor}
        className="flex divide-x overflow-hidden rounded-lg border bg-card p-2 shadow-lg shadow-black/20"
      >
        <button type="button">Bold</button>
        <button type="button">Bold</button>
        <button type="button">Bold</button>
      </BubbleMenu>
    </>
  );
};
