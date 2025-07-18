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
  const taskListFinish = document.getElementById("task-list-finish");

  taskList.innerHTML = ""; // Limpa a lista de tarefas em aberto
  taskListFinish.innerHTML = ""; // Limpa a lista de tarefas finalizadas

  const tasks = loadTasks();

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    // Conteúdo da tarefa
    listItem.innerHTML = `
      <span class="task-title">${task.title}</span>
      <div class="task-icons">
          <img src="./assets/edit.svg" class="icon-edit" title="Editar tarefa" onclick="editTask(${task.id})" />
          <img src="./assets/delete.svg" class="icon-delete" title="Remover tarefa" onclick="deleteTask(${task.id})" />
          <img src="./assets/check.svg" class="icon-check" title="Marcar como finalizada" onclick="toggleTaskStatus(${task.id})" />
      </div>
    `;

    // Verifica o status da tarefa e adiciona na lista correta
    if (task.status === "finalizada") {
      listItem.style.textDecoration = "line-through";
      taskListFinish.appendChild(listItem);
    } else {
      taskList.appendChild(listItem);
    }
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
    percentTasks();
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
  percentTasks();
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
    percentTasks();
  }
}

// Inicializar o evento de adicionar tarefa
document.querySelector(".add-task").addEventListener("click", addTask);

// Renderizar as tarefas ao carregar a página
renderTasks();

// impressão da página
function printPage() {
  window.print();
}

//relogio de data na página
function updateClock() {
  const now = new Date();
  const formattedDate = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById("hour-date").innerText = formattedDate;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Chama a primeira vez ao carregar
updateClock();

//função resumo de quantidade de tarefas
function percentTasks() {
  const tasks = loadTasks();

  const tasksOpen = tasks.filter((task) => task.status === "em aberto");
  const tasksFinished = tasks.filter((task) => task.status === "finalizada");

  //total de tarefas
  const totalTasks = tasksOpen.length + tasksFinished.length;

  const percentage =totalTasks === 0 ? 0 : Math.round(tasksFinished.length / totalTasks * 100);

  document.getElementById("percent-tasks").innerText = `${percentage}% das tarefas concluídas`;
}

percentTasks();
