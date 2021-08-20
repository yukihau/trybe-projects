// Variáveis
let storedTasks = [];
let taskList = [];
const createButton = document.querySelector('#criar-tarefa');
const clearButton = document.querySelector('#apaga-tudo');
const removeButton = document.querySelector('#remover-finalizados');
const saveButton = document.querySelector('#salvar-tarefas');
const upButton = document.querySelector('#mover-cima');
const downButton = document.querySelector('#mover-baixo');
const removeSelectedButton = document.querySelector('#remover-selecionado');
const main = document.querySelector('main');
const allListItems = '#lista-tarefas li';
const completed = '.completed';

// Funções
function highlightTask(event) {
  const selected = document.querySelectorAll('.selected');

  if (!event.target.classList.contains('selected')) {
    for (let index = 0; index < selected.length; index += 1) {
      selected[index].classList.remove('selected');
    }
    event.target.classList.add('selected');
  } else {
    event.target.classList.remove('selected');
  }
}

function finishTask(event) {
  if (!event.target.classList.contains('completed')) {
    event.target.classList.add('completed');
  } else {
    event.target.classList.remove('completed');
  }
}

function addTask() {
  const input = document.querySelector('#texto-tarefa');
  if (input.value !== '') {
    const newTask = document.createElement('li');
    newTask.innerText = input.value;
    newTask.addEventListener('click', highlightTask);
    newTask.addEventListener('dblclick', finishTask);
    taskList.appendChild(newTask);
    input.value = '';
  } else {
    window.alert('Você não digitou nada!');
  }
}

function clearList() {
  const list = document.querySelectorAll(allListItems);

  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }

  storedTasks = [];
}

function removeFinishedTasks() {
  const finishedTasks = document.querySelectorAll(completed);

  for (let index = 0; index < finishedTasks.length; index += 1) {
    finishedTasks[index].remove();
  }
}

function saveTasks() {
  const list = document.querySelectorAll(allListItems);
  storedTasks = [];

  for (let index = 0; index < list.length; index += 1) {
    if (list[index].classList.contains('completed')) {
      storedTasks.push(list[index].innerText + completed);
    } else {
      storedTasks.push(list[index].innerText);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function moveUp() {
  const liCurrent = document.querySelector('.selected');

  if (liCurrent != null) {
    const liAbove = document.querySelector('.selected').previousSibling;

    if (liAbove === null) {
      return;
    }

    taskList.insertBefore(liCurrent, liAbove);
  }
}

function moveDown() {
  const liCurrent = document.querySelector('.selected');

  if (liCurrent != null) {
    const liBelow = document.querySelector('.selected').nextSibling;

    if (liBelow === null) {
      return;
    }

    taskList.insertBefore(liBelow, liCurrent);
  }
}

function removeSelected() {
  document.querySelector('.selected').remove();
}

function generateEventListeners() {
  const allTasks = document.querySelectorAll(allListItems);
  for (let index = 0; index < allTasks.length; index += 1) {
    allTasks[index].addEventListener('click', highlightTask);
    allTasks[index].addEventListener('dblclick', finishTask);
  }

  taskList = document.querySelector('#lista-tarefas');
}

function getStorageItems() {
  const list = document.createElement('ol');
  storedTasks = JSON.parse(localStorage.getItem('tasks'));
  list.id = 'lista-tarefas';

  for (let index = 0; index < storedTasks.length; index += 1) {
    if (storedTasks[index].includes(completed)) {
      list.innerHTML += `<li class='completed'>${storedTasks[index].replace(completed, '')}</li>`;
    } else {
      list.innerHTML += `<li>${storedTasks[index]}</li>`;
    }
  }

  main.appendChild(list);
}

function generateList() {
  if (localStorage.getItem('tasks')) {
    getStorageItems();
  } else {
    const list = document.createElement('ol');
    list.id = 'lista-tarefas';
    main.appendChild(list);
    taskList = document.querySelector('#lista-tarefas');
  }
}

generateList();
generateEventListeners();

// Event Listeners
createButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearList);
removeButton.addEventListener('click', removeFinishedTasks);
saveButton.addEventListener('click', saveTasks);
upButton.addEventListener('click', moveUp);
downButton.addEventListener('click', moveDown);
removeSelectedButton.addEventListener('click', removeSelected);
