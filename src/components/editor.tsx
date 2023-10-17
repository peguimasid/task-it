'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {}

export const Editor = ({}: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      '<h1>Advantages of Tailwind CSS</h1> <p>Tailwind CSS is a utility-first CSS framework that offers several advantages for web development:</p> <blockquote>Tailwind is the best in the market</blockquote> <a href="https://github.com/peguimasid">Github</a> <ul> <li> <strong>Saves Time and Effort: </strong> <span>Tailwind classes enable rapid styling, reducing the need to write custom CSS.</span> </li> <li> <strong>Scalability: </strong> <span>Easily scale your design to fit the needs of your project.</span> </li> <li> <strong>Maintainability: </strong> <span>Clear and predictable class names make code maintainable and readable.</span> </li> </ul>',
    editorProps: {
      attributes: {
        class: 'outline-none'
      }
    }
  });

  return <EditorContent className="prose prose-stone max-w-full dark:prose-invert" editor={editor} />;
};
