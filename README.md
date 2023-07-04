Improve it:

# Hi 👋 Welcome to Task-it

## Simplify Project Management and Task Collaboration

I've created Task-it as a side project to address a common pain point I face as a freelancer - managing project tasks for multiple clients. Task-it also provides me with an opportunity to work with exciting new technologies like Next.js 13, NextAuth, Tailwind CSS, Trpc, and Prisma DB. With Task-it, my goal is to develop a comprehensive full-stack application that brings together all the essential features in a single, user-friendly platform.

I invite you to join me on this exciting journey and contribute your suggestions and improvements along the way. 😎

## Version 0:

In this initial version, our primary focus is on configuring and deploying the Task-it application. While doing so, we aim to maintain a sense of progress and inspiration throughout the development process. This version serves as a checkpoint, ensuring that we keep moving forward.

### **Tasks:**

- [ ]  Implement a public login page with authentication options including Auth0, Facebook, Github, Discord, and Google.
- [ ]  Create a private home page that displays user information.

## Version 1:

In the previous version, we successfully implemented the authentication feature, providing secure access to Task-it. Additionally, we established the necessary infrastructure to associate databases and application entities with user accounts, enabling efficient project tracking.

Building upon these foundations, our focus for Version 1 is to enhance user productivity and organization. The home page will offer a clear overview of active projects, while within each project, users will have access to a user-friendly kanban board for effective task management and collaboration.

By combining these essential features, Task-it simplifies project management, empowering users to stay organized and focused on their tasks.

### Tasks:

1. Projects
    - [ ]  Allow users to view the list of their projects on the home page.
    - [ ]  Implement functionalities for users to create, update, and delete projects.
    
    **Project Fields:**
    
    - `Name`: Provide a name for the project.
    - `Description`: Include a brief description of the project.
2. Tasks
    - [ ]  Enhance the display of project tasks, ensuring an intuitive and visually appealing list.
    - [ ]  Enable users to create, update, and delete tasks within projects.
    - [ ]  Implement drag-and-drop functionality to allow tasks to be easily moved between different status categories.
    
    **Task Fields:**
    
    - `Title`: Provide a concise title for the task.
    - `Description`: Include additional details or instructions for the task.
    - `Status`: Assign an status to the task (Backlog, In Progress, In Review, Done).
    - `Priority`: Specify the priority level of the task (High, Medium, Low).
    - `Size`: Indicate the size or effort required for the task (Large, Medium, Small, Tiny).
