# Modern Task Manager

Owner: Karan

A clean, responsive, single-file (static) To‑Do application that helps you manage tasks with due dates, priorities, and simple persistence (localStorage). The project is intentionally lightweight and easy to extend.

Quick overview
- Add, edit and delete tasks.
- Mark tasks complete — progress bar and counters update automatically.
- Filter (All / Active / Completed) and sort (Newest / Oldest / Priority / Due date).
- Dark / Light theme toggle with persistence.



Quick start (run locally)
1. Make sure the following files are in the same folder: `index.html`, `style.css`, and the `images/` and `sounds/` folders (if used).
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox).
3. Add a task using the form, mark it complete, toggle the theme, and reload the page to confirm persistence.

Optional: serve with a simple static server (useful for testing notifications or service workers):

```powershell
npx http-server . -p 8080
# then open http://localhost:8080/index.html
```

Data model
- Tasks are stored in localStorage under the key `tasks` (JSON array).
- Example task object:

```json
{
	"id": "t_abc123",
	"text": "Buy groceries",
	"due": "2025-11-10",
	"priority": "medium",
	"completed": false,
	"createdAt": "2025-11-06T12:34:56.789Z"
}
```

Code snippets to highlight (where to look)
- Persistence: `localStorage.setItem('tasks', JSON.stringify(tasks))` and `JSON.parse(localStorage.getItem('tasks'))`.
- Rendering: cloning the `<template id="task-template">` and filling in fields before appending to `#task-list`.
- Theme: `document.documentElement.setAttribute('data-theme', 'dark'|'light')` and saving choice to `localStorage`.

Developer notes & extension ideas
- Inline edit (replace modal with inline edit fields) — improves UX.
- Drag & drop ordering (persist order) — use HTML5 drag API or a small utility library.
- Import / Export JSON for backups and device transfer.
- PWA: add a manifest and service worker to make the app installable and offline-capable.

Contributing
- Make small, focused changes. If adding features, update the README with usage and data-schema changes.

License
- This project is provided as-is. Add your preferred license here (e.g., MIT) if you plan to share it publicly.

Contact
- Owner: Karan — update this line if you want a different display name or an email/URL.

---
If you want, I can generate a ready-to-edit PowerPoint for your project, or prepare the exact screenshots and code snippets for the slides. Tell me which and I will add it to the todo list and produce the files.
