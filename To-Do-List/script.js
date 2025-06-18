let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="checkbox" onclick="toggleComplete(${index})">
        ${task.completed ? '✅' : '⬜'}
      </div>
      <div class="task-text" onclick="editTask(${index})">${task.text}</div>
    `;
    list.appendChild(li);
  });

  updateProgress();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function promptNewTask() {
  const text = prompt('Enter a new task:');
  if (text && text.trim() !== '') {
    tasks.push({ text: text.trim(), completed: false });
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt('Edit Task:', tasks[index].text);
  if (newText && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function updateDate() {
  const dateEl = document.getElementById('date');
  const dayEl = document.getElementById('day');
  const now = new Date();

  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  dateEl.textContent = `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  dayEl.textContent = dayNames[now.getDay()];
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById('progress-fill').style.width = `${percent}%`;
  document.getElementById('progress-percent').textContent = `${percent}%`;
}

window.onload = () => {
  updateDate();
  renderTasks();

  // Optional: make task list sortable
  new Sortable(document.getElementById('task-list'), {
    animation: 150,
    onEnd: function (evt) {
      const movedItem = tasks.splice(evt.oldIndex, 1)[0];
      tasks.splice(evt.newIndex, 0, movedItem);
      saveTasks();
    }
  });
};
