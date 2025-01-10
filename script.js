// Função para carregar as tarefas do localStorage
function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Função para salvar as tarefas no localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para renderizar as tarefas na tela
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Limpa a lista antes de renderizar novamente
  const tasks = loadTasks();

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    // Estilo para tarefas finalizadas
    if (task.status === "finalizada") {
      listItem.style.textDecoration = "line-through";
    }

    // Conteúdo da tarefa
    listItem.innerHTML = `
    <span class="task-title">${task.title}</span>
    <div class="task-icons">
        <img src="assets/edit.svg" class="icon-edit" title="Editar tarefa" onclick="editTask(${task.id})" />
        <img src="assets/delete.svg" class="icon-delete" title="Remover tarefa" onclick="deleteTask(${task.id})" />
        <img src="assets/check.svg" class="icon-check" title="Marcar como finalizada" onclick="toggleTaskStatus(${task.id})" />
    </div>
`;

    taskList.appendChild(listItem);
  });
}

// Função para adicionar uma nova tarefa
function addTask() {
  const title = prompt("Digite o título da nova tarefa:");
  if (title) {
    const tasks = loadTasks();
    const newTask = {
      id: Date.now(),
      title: title,
      status: "em aberto",
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
  }
}

// Função para editar uma tarefa
function editTask(taskId) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex >= 0) {
    const newTitle = prompt(
      "Digite o novo título da tarefa:",
      tasks[taskIndex].title
    );
    if (newTitle) {
      tasks[taskIndex].title = newTitle;
      saveTasks(tasks);
      renderTasks();
    }
  }
}

// Função para remover uma tarefa
function deleteTask(taskId) {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(updatedTasks);
  renderTasks();
}

// Função para alternar o status de uma tarefa
function toggleTaskStatus(taskId) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex >= 0) {
    tasks[taskIndex].status =
      tasks[taskIndex].status === "em aberto" ? "finalizada" : "em aberto";
    saveTasks(tasks);
    renderTasks();
  }
}

// Inicializar o evento de adicionar tarefa
document.querySelector(".add-task").addEventListener("click", addTask);

// Renderizar as tarefas ao carregar a página
renderTasks();
