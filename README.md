# Hi 👋 Welcome to Task-it

## Simplify Project Management and Task Collaboration

I've created Task-it as a side project to address a common pain point I face as a freelancer - managing project tasks for multiple clients. Task-it also provides me with an opportunity to work with exciting new technologies like Next.js 13, NextAuth, Tailwind CSS, and Prisma DB. With Task-it, my goal is to develop a comprehensive full-stack application that brings together all the essential features in a single, user-friendly platform.

I invite you to join me on this exciting journey and contribute your suggestions and improvements along the way. 😎

### Progress so far:

https://github.com/peguimasid/task-it/assets/54289589/82c95e77-3ad7-4440-b8c2-fb974aed2c73

> Project page design was created by my talented brother, Pedro Masid, the best Product Designer i know.
> You can check more of his work on [Dribbble](https://dribbble.com/pmasid)

## Version 0:

In this initial version, our primary focus is on configuring and deploying the Task-it application. While doing so, we aim to maintain a sense of progress and inspiration throughout the development process. This version serves as a checkpoint, ensuring that we keep moving forward.

### **Tasks:**

- [x]  Implement a public login page with authentication options including Auth0, Github, Discord, and Google.
- [x]  Create a private home page that displays user information.

## Version 1:

In the previous version, we successfully implemented the authentication feature, providing secure access to Task-it. Additionally, we established the necessary infrastructure to associate databases and application entities with user accounts, enabling efficient project tracking.

Building upon these foundations, our focus for Version 1 is to enhance user productivity and organization. The home page will offer a clear overview of active projects, while within each project, users will have access to a user-friendly kanban board for effective task management and collaboration.

By combining these essential features, Task-it simplifies project management, empowering users to stay organized and focused on their tasks.

### Tasks:

1. Projects
    - [x] Allow users to view the list of their projects on the home page.
    - [x] Create projects
    - [x] Update projects
    - [x] Delete projects

    **Project Fields:**

    - `Name`: Provide a name for the project.
2. Tasks
    - [x] Develop an endpoint to retrieve project-specific tasks.
    - [x] Create a `StatusColumn` component to display task columns for each status.
    - [x] Design a `TaskCard` component to present individual tasks within status columns.
    - [x] Enable drag-and-drop functionality for seamless task movement between columns.
    - [x] Implement a modal for adding new tasks to the project.
    - [x] Add task editing features, including modifications to title, description, status, priority, size, and tags.
    - [x] Integrate a Tip-tap WYSIWYG editor to enhance the task description interface.


    **Task Fields:**

    - `Title`: Provide a concise title for the task.
    - `Description`: Include additional details or instructions for the task.
    - `Status`: Assign an status to the task (Backlog, In Progress, Done).
    - `Priority`: Specify the priority level of the task (Urgent, High, Medium, Low).
    - `Size`: Indicate the size or effort required for the task (Large, Medium, Small, Tiny).

# Version 2

This version marks the next step in enhancing Task-It's usability and preparing it for more exciting features in the future. Our goal is to make your task management experience delightful and efficient.

While the centerpiece of this update is the editor inside the task sheet, we've also got some other tasks. Here's what's on the roadmap, ordered by priority:

- [ ] **Confirm Exit Dialog**: We're adding a confirmation dialog when you try to close a sheet with unsaved changes.
- [ ] **Links Support**: Soon, you'll be able to embed hyperlinks directly within the task editor.
- [ ] **To-Do Lists**: We're introducing the ability to create and manage to-do lists inside the task editor.
- [ ] **Drag and Drop**: You'll be able to effortlessly move and rearrange items within the editor using drag-and-drop.

> We're evaluating the feasibility of [this](https://github.com/peguimasid/task-it/issues/14) requested feature: **File Uploads**. The ability to upload and store files such as code snippets, images, and even spreadsheets directly within the editor. We'll keep you updated on our progress.

*Note: We're committed to constant improvement, so we might add more features based on your feedback and emerging needs as development progresses.*
