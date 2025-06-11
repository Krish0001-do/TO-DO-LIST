document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const completeSound = document.getElementById('complete-sound');
    const deleteSound = document.getElementById('delete-sound');
    const progressbar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(({ text, completed }) => createTaskElement(text, completed));
        toggleEmptyState();
        updateProgress();
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const text = li.querySelector('span').textContent;
            const completed = li.querySelector('.checkbox').checked;
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateProgress();
    };

    // Show/hide empty image
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    // Update progress bar
        const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

        progressbar.style.width = `${percentage}%`;
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        // 🎉 Cheer sound when 100% complete
        if (completedTasks === totalTasks && totalTasks > 0 && !cheered) {
            const cheerSound = document.getElementById('cheer-sound');
            if (cheerSound) {
                cheerSound.currentTime = 0;
                cheerSound.play();
            }
            cheered = true;
        }

        // Reset cheer if task unchecked
        if (completedTasks < totalTasks) {
            cheered = false;
        }
    };

    // Create task element
    const createTaskElement = (text, completed = false) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <span class="${completed ? 'completed' : ''}">${text}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
        toggleEmptyState();
        updateProgress();
    };

    // Add new task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        createTaskElement(taskText);
        taskInput.value = '';
        saveTasks();
    };

    // Add task events
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });

    // Handle task actions
    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        const span = li.querySelector('span');
        const checkbox = li.querySelector('.checkbox');

        // ✅ Complete
        if (e.target.classList.contains('checkbox')) {
            span.classList.toggle('completed', checkbox.checked);
            if (checkbox.checked && completeSound) {
                completeSound.currentTime = 0;
                completeSound.play();
            }
            saveTasks();
            return;
        }

        // 🗑️ Delete
        if (e.target.closest('.delete-btn')) {
            if (confirm("Are you sure you want to delete this task?")) {
                if (deleteSound) {
                    deleteSound.currentTime = 0;
                    deleteSound.play();
                }
                li.remove();
                toggleEmptyState();
                saveTasks();
            }
            return;
        }

        // ✏️ Edit
        if (e.target.closest('.edit-btn')) {
            const newText = prompt("Edit task:", span.textContent);
            if (newText !== null && newText.trim() !== '') {
                span.textContent = newText.trim();
                saveTasks();
            }
        }
    });

    loadTasks();
});

